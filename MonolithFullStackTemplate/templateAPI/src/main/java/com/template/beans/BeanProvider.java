package com.template.beans;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.stereotype.Component;

/**
 * Bean Providers.
 */
@Component
public class BeanProvider {

    /**
     * Password encoder org . springframework . security . crypto . password . password encoder.
     * @return the org . springframework . security . crypto . password . password encoder
     */
    @Bean
    public org.springframework.security.crypto.password.PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
