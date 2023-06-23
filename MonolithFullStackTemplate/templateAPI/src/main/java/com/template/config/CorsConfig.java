package com.template.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The type Cors config.
 * Implement the CORS headers that will authorize access by clients from any domain
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {


//    @Bean
//    public WebMvcConfigurer corsConfigurer()
//    {
//        String[] allowDomains = new String[2];
//        allowDomains[0] = "http://localhost:4200";
//        allowDomains[1] = "http://localhost:8080";
//
//        System.out.println("CORS configuration....");
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**").allowedOrigins(allowDomains);
//            }
//        };
//    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowDomains = new String[2];
        allowDomains[0] = "http://localhost:4200";
        allowDomains[1] = "http://localhost:8080";

        registry
                .addMapping("/**")
                .allowedMethods("OPTIONS", "GET", "PUT", "POST", "DELETE", "PATCH")
//                .exposedHeaders("Authorization");
                .allowedOrigins(allowDomains)
                .allowedHeaders("*");

    }


//    @Bean
//    public CorsFilter corsFilter() {
//        final CorsConfiguration config = new CorsConfiguration();
//        config.addAllowedOrigin("**");
//        config.addAllowedHeader("**");
//        config.setAllowedMethods(Arrays.asList(
//                new String[] {"OPTIONS", "GET", "POST", "PUT", "DELETE"}));
//
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//
//        return new CorsFilter(source);
//    }

    //    @Override
    //    public void addCorsMappings(final CorsRegistry registry) {
    //
    //        registry.addMapping("/**")
    //                .allowedOrigins("http://localhost:4200")
    //                .allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE", "HEAD")
    //                .allowCredentials(true)
    //        ;
    //    }
}
