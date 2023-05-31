package com.template.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;

/**
 * The type Security config.
 * This is our application scope security config bean.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        //set frame options to self to allow h2 console server
        http.headers().frameOptions().sameOrigin();

        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
//                .requestMatchers("/**").permitAll()
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/api/h2-console/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/auth/logout")
                .addLogoutHandler(logoutHandler)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        ;

        return http.build();
    }

//    @Autowired
//    JwtTokenProviderDeprecated jwtTokenProviderDeprecated;


    // Moved to applicatiton configuration under authenticationProvider
//    /**
//     * Authentication manager bean authentication manager.
//     * @return the authentication manager
//     * @throws Exception the exception
//     */
//
//    @Bean
//    @Override
//    public AuthenticationManager authenticationManagerBean() throws Exception {
//        return super.authenticationManagerBean();
//    }


//    @Override
//    protected void configure(final HttpSecurity http) throws Exception {
//        //set frame options to self to allow h2 console server
//        http.headers().frameOptions().sameOrigin();
//
//        http
//                .httpBasic().disable()
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .authorizeRequests()
//                .antMatchers("api/test/test").permitAll()
//                .antMatchers("*/auth/signin/*").permitAll()
//                .antMatchers("/api/auth/signin").permitAll()
//                .antMatchers("/auth/register").permitAll()
//                .antMatchers("/h2-console/**").permitAll()
//                //TODO fix this shit .antMatchers("/userprofile/**").authenticated()
//
//                //                .antMatchers("/eureka/**").permitAll()
//                //                .antMatchers(HttpMethod.GET, "api/providers/**").permitAll()
//                .antMatchers(HttpMethod.GET, "/providers/**").hasAnyRole("ADMIN", "USER")
//                //                .antMatchers(HttpMethod.POST, "/providers/**").hasRole("ADMIN")
//                //                .antMatchers(HttpMethod.PUT, "/providers/**").hasRole("ADMIN")
//                //                .antMatchers(HttpMethod.DELETE, "/providers/**").hasRole("ADMIN")
//                .antMatchers(HttpMethod.GET, "/users/**").hasAnyRole("ADMIN", "USER")
//                //                .antMatchers("/*").hasAnyRole("ADMIN", "USER")
//                //                .anyRequest().authenticated()
//                .and()
//                .apply(new JwtConfigurer(jwtTokenProvider));
//        //@formatter:on
//    }

    //    //Add in memory authentication for tests
    //    @Override
    //    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
    //        auth.inMemoryAuthentication().withUser("admin").password("password").roles("ADMIN");
    //    }
}
