package com.template.users.events;

import java.io.Serializable;
import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.template.libraries.core.Event;
import lombok.Builder;
import lombok.Value;
import org.springframework.context.ApplicationEvent;

import lombok.Getter;

/**
 * The type User created event.
 */
@Value
@Builder
public class UserCreatedEvent implements Event {

    @NotNull
    private Long userId;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String email;

    private LocalDate dateOfBirth;

}
