package com.template.security.jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * The type Jwt configurer.
 * This bean is used to set up JwtTokenFilter.
 */
@Deprecated
public class JwtConfigurerDeprecated extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final JwtTokenProviderDeprecated jwtTokenProviderDeprecated;

    /**
     * Instantiates a new Jwt configurer.
     * @param jwtTokenProviderDeprecated the jwt token providers
     */
    public JwtConfigurerDeprecated(final JwtTokenProviderDeprecated jwtTokenProviderDeprecated) {
        this.jwtTokenProviderDeprecated = jwtTokenProviderDeprecated;
    }

    @Override
    public void configure(final HttpSecurity http) throws Exception {
        final JwtTokenFilterDeprecated customFilter = new JwtTokenFilterDeprecated(jwtTokenProviderDeprecated);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
