package com.template.beans;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * Bean Providers.
 */
@Component
public class BeanProvider {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public Jackson2ObjectMapperBuilder jacksonBuilder() {
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder();

        // Response Serializer
        // builder.featuresToEnable(SerializationFeature.WRAP_ROOT_VALUE);

        // Request deserializer
        builder.featuresToEnable(DeserializationFeature.UNWRAP_ROOT_VALUE);

        builder.failOnUnknownProperties(false);

        return builder;
    }
}
