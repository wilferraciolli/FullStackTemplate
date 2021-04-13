/*
 * (c) Midland Software Limited 2019
 * Name     : UserRegisteredEvent.java
 * Author   : ferraciolliw
 * Date     : 12 Nov 2019
 */
package com.template.security.authentication.events;

import com.template.libraries.core.Event;
import com.template.validation.ValidateUniqueUsername;
import lombok.Builder;
import lombok.Value;
import org.springframework.context.ApplicationEvent;

import com.template.security.authentication.RegistrationRequest;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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

