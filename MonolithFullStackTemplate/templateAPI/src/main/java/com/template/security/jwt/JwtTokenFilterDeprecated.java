package com.template.security.jwt;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

/**
 * The type Jwt token filter.
 * This bean is used to validate a token received on requests.
 */
@Deprecated
public class JwtTokenFilterDeprecated extends GenericFilterBean {

    private static final Logger log = LoggerFactory.getLogger(JwtTokenFilterDeprecated.class);

    private final JwtTokenProviderDeprecated jwtTokenProviderDeprecated;

    /**
     * Instantiates a new Jwt token filter.
     *
     * @param jwtTokenProviderDeprecated the jwt token providers
     */
    public JwtTokenFilterDeprecated(final JwtTokenProviderDeprecated jwtTokenProviderDeprecated) {
        this.jwtTokenProviderDeprecated = jwtTokenProviderDeprecated;
    }

    @Override
    public void doFilter(final ServletRequest req, final ServletResponse res, final FilterChain filterChain)
            throws IOException, ServletException {
        final String token = jwtTokenProviderDeprecated.resolveToken((HttpServletRequest) req);

//        try {
//            if (token != null && jwtTokenProviderDeprecated.validateToken(token)) {
//                final Authentication auth = token != null ? jwtTokenProviderDeprecated.getAuthentication(token) : null;
//                SecurityContextHolder.getContext().setAuthentication(auth);
//            }
//        } catch (final Exception e) {
//            log.error("Bad Token, returning 401 "+ e.getMessage());
//            ((HttpServletResponse) res).sendError(HttpServletResponse.SC_UNAUTHORIZED, "The token is not valid.");
//        }

        //Carry on filtering
        filterChain.doFilter(req, res);
    }
}
