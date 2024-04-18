package com.template.config;


import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.util.TimeZone;

@Configuration
public class LocaleConfig {

    @PostConstruct
    public void init() {
        // Sets JVM default time zone to UTC
        TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
    }
}