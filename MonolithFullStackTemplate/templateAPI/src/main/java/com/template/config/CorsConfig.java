package com.template.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * The type Cors config.
 * Implement the CORS headers that will authorize access by clients from any domain
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        List<String> allowDomains = List.of(
                "http://localhost:4200",
                "http://localhost:8080",
                "duckdns.org"
        );

        registry
                .addMapping("/**")
                .allowedOrigins(allowDomains.toArray(new String[0]))
                .allowedMethods("*");
    }
}
