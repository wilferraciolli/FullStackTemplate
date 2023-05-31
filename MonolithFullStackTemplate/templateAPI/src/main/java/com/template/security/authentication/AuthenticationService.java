package com.template.security.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.template.config.JwtService;
import com.template.exceptions.EntityNotFoundException;
import com.template.libraries.core.BaseApplicationService;
import com.template.libraries.core.EventPublisher;
import com.template.security.authentication.events.UserRegisteredEvent;
import com.template.security.jwt.JwtTokenProviderDeprecated;
import com.template.security.jwt.Token;
import com.template.security.jwt.TokenRepository;
import com.template.security.jwt.TokenType;
import com.template.security.jwt.refresh.RefreshTokenDeprecated;
import com.template.security.jwt.refresh.RefreshTokenException;
import com.template.security.jwt.refresh.RefreshTokenRequest;
import com.template.security.jwt.refresh.RefreshTokenServiceDeprecated;
import com.template.users.user.User;
import com.template.users.user.UserRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import jakarta.validation.Valid;

import java.util.Objects;


/**
 * The type Authentication service.
 */
@Service
@Transactional
public class AuthenticationService extends BaseApplicationService {

    private static final String TOKEN_TYPE = "bearer";
    private static final String DEFAULT_SCOPE = "read, write";

//    @Value("${security.oauth2.resource.jwt.token.expire-length}")
//    private Long validityInMilliseconds;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository useRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private JwtTokenProviderDeprecated jwtTokenProviderDeprecated;


    @Autowired
    private EventPublisher eventPublisher;

    @Autowired
    private RefreshTokenServiceDeprecated refreshTokenServiceDeprecated;

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

    public AuthenticationResourceResponse authenticate(final AuthenticationRequest data) {
        try {
            final String username = data.getUsername();
            this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    username,
                    data.getPassword())
            );

            final User user = this.resolveUser(username);
            final String accessToken = this.jwtService.generateToken(user);
            final String refreshToken = this.jwtService.generateRefreshToken(user);

            // remove all tokens as the user has signed on and has new tokens
            revokeAllUserTokens(user);
            saveUserToken(user, accessToken);

            return this.buildAuthenticationResponse(accessToken, refreshToken, user.getId(), username);

        } catch (final AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void verifyAccount(final Long userId) {

        final User userNameToVerify = useRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Invalid user id"));

        userNameToVerify.activateAccount();
        useRepository.save(userNameToVerify);

        //TODO publish event of user activated
    }

    public AuthenticationResourceResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws RefreshTokenException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String username;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                            throw new RefreshTokenException("Cannot refresh Token, invalid authorization Header");
        }

        refreshToken = authHeader.substring(7);
        username = jwtService.extractUsername(refreshToken);

        if (StringUtils.isNotBlank(username )) {
            User user = this.useRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found"));
            if (jwtService.isTokenValid(refreshToken, user)) {
                String accessToken = jwtService.generateToken(user);
                revokeAllUserTokens(user);
                saveUserToken(user, accessToken);

                return this.buildAuthenticationResponse(accessToken, refreshToken, user.getId(), username);
            }
        }

        throw new RefreshTokenException("Cannot extract Username from token");
    }

    private AuthenticationResourceResponse buildAuthenticationResponse(final String accessToken, final String refreshToken, final Long userId, final String userName) {
        return AuthenticationResourceResponse.builder()
                .accessToken(accessToken)
                .tokenType(TOKEN_TYPE)
                .expiresIn(3600000L) //TODO this needs to be dynamic
                .refreshToken(refreshToken)
                .scope(DEFAULT_SCOPE) //TODO this need to be dynamic
                .build();
    }

    private String createAccessToken(final User user) {
        return this.jwtTokenProviderDeprecated.createToken(user.getUsername(), user.getId(), user.getRoles());
    }

    private User resolveUser(final String username) {
        return this.useRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + "not found"));
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }

        validUserTokens.stream()
                .filter(Objects::nonNull)
                .forEach(token -> {
                    token.setExpired(true);
                    token.setRevoked(true);
                });
        tokenRepository.saveAll(validUserTokens);
    }

}
