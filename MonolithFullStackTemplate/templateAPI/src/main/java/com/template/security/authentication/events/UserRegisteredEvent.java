package com.template.security.authentication.events;

import com.template.libraries.core.Event;
import com.template.validation.ValidateUniqueUsername;
import lombok.Builder;
import lombok.Value;
import org.springframework.context.ApplicationEvent;

import com.template.security.authentication.RegistrationRequest;

import lombok.Getter;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

/**
 * The type User registered event.
 */
@Value
@Builder
public class UserRegisteredEvent implements Event {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private LocalDate dateOfBirth;
}

