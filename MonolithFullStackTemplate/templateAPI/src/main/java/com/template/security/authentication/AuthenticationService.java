package com.template.security.authentication;

import com.template.exceptions.EntityNotFoundException;
import com.template.libraries.core.BaseApplicationService;
import com.template.libraries.core.EventPublisher;
import com.template.security.authentication.events.UserRegisteredEvent;
import com.template.security.jwt.JwtTokenProvider;
import com.template.security.jwt.refresh.RefreshToken;
import com.template.security.jwt.refresh.RefreshTokenException;
import com.template.security.jwt.refresh.RefreshTokenRequest;
import com.template.security.jwt.refresh.RefreshTokenService;
import com.template.users.user.User;
import com.template.users.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;


/**
 * The type Authentication service.
 */
@Service
public class AuthenticationService extends BaseApplicationService {

    private static final String TOKEN_TYPE = "bearer";
    private static final String DEFAULT_SOCPE = "read, write";

    @Value("${security.oauth2.resource.jwt.token.expire-length}")
    private Long validityInMilliseconds;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository useRepository;

    @Autowired
    private EventPublisher eventPublisher;

    @Autowired
    private RefreshTokenService refreshTokenService;

    /**
     * Authenticate authentication resource response.
     * @param data the data
     * @return the authentication resource response
     */
    public AuthenticationResourceResponse authenticate(final AuthenticationRequest data) {
        try {
            final String username = data.getUsername();
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));

            final User user = this.resolveUser(username);
            final String token = this.createAccessToken(user);

            return this.buildAuthenticationResponse(token, user.getId(), username);

        } catch (final AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

    /**
     * Register.
     * @param data the data
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void register(@Valid final RegistrationRequest data) {

        this.eventPublisher.publishEvent(UserRegisteredEvent.builder()
                .firstName(data.getFirstName())
                .lastName(data.getLastName())
                .email(data.getEmail())
                .password(data.getPassword())
                .dateOfBirth(data.getDateOfBirth())
                .build());
    }

    public void verifyAccount(final Long userId) {

        final User userNameToVerify = useRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Invalid user id"));

        userNameToVerify.activateAccount();
        useRepository.save(userNameToVerify);

        //TODO publish event of user activated
    }

    /**
     * Refresh token authentication resource response.
     * @param data the data
     * @return the authentication resource response
     * @throws RefreshTokenException the refresh token exception
     */
    public AuthenticationResourceResponse refreshToken(@Valid final RefreshTokenRequest data) throws RefreshTokenException {
        final RefreshToken refreshToken = this.refreshTokenService.loadRefreshToken(data.getRefreshToken());

        final User user = this.resolveUser(refreshToken.getUsername());
        final String accessToken = this.createAccessToken(user);

        return this.buildAuthenticationResponse(accessToken, user.getId(), refreshToken.getUsername());
    }

    private AuthenticationResourceResponse buildAuthenticationResponse(final String token, final Long userId, final String userName) {
        return AuthenticationResourceResponse.builder()
                .accessToken(token)
                .tokenType(TOKEN_TYPE)
                .expiresIn(3600000L)
                .refreshToken(this.refreshTokenService.generateRefreshToken(userId, userName))
                .scope(DEFAULT_SOCPE)
                .build();
    }

    private String createAccessToken(final User user) {
        return this.jwtTokenProvider.createToken(user.getUsername(), user.getId(), user.getRoles());
    }

    private User resolveUser(final String username) {

        return this.useRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found"));
    }
}
