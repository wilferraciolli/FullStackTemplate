package com.template.config;


import com.template.exceptions.DomainException;
import com.template.security.UserContextVO;
import com.template.security.UserDetailsContextHolder;
import com.template.security.jwt.TokenRepository;
import com.template.users.details.UserDetailsView;
import com.template.users.details.UserDetailsViewRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserDetailsViewRepository userDetailsViewRepository;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        try {
            final String authHeader = request.getHeader("Authorization");
            final String jwt;
            final String userEmail;
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response);

                return;
            }

            // TODO can we add something here to check if permission should be run????

            jwt = authHeader.substring(7);
            userEmail = jwtService.extractUsername(jwt);
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
                var isTokenValid = tokenRepository.findFirstByToken(jwt)
                        .map(t -> !t.getExpired() && !t.getRevoked())
                        .orElse(false);

                if (jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // add user logged on details
                    setContextSecurity(authToken, userDetails);
                }
            }
            filterChain.doFilter(request, response);
        } finally {
            // Remove everything once the request ends
            SecurityContextHolder.clearContext();

            UserDetailsContextHolder.clearUserContext();
        }
    }

    private void setContextSecurity(UsernamePasswordAuthenticationToken authToken, UserDetails userDetails) {
        SecurityContextHolder.getContext().setAuthentication(authToken);

        UserDetailsView userDetailsView = userDetailsViewRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new DomainException("could not find user details view for given username"));

        UserDetailsContextHolder.setUserDetailsContext(
                new UserContextVO(
                        userDetailsView.getId(),
                        userDetailsView.getPersonId(),
                        userDetailsView.getFirstName(),
                        userDetailsView.getLastName(),
                        userDetailsView.getUsername(),
                        userDetailsView.getActive(),
                        userDetails.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .toList()
                ));
    }
}
