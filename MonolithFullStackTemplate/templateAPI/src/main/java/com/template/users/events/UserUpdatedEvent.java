package com.template.users.events;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import org.springframework.context.ApplicationEvent;

import lombok.Getter;

/**
 * The type User updated event.
 */
@Getter
public class UserUpdatedEvent extends ApplicationEvent {

    @NotNull
    private Long userId;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String email;

    private LocalDate dateOfBirth;


    public UserUpdatedEvent(final Object source, @NotNull final Long userId, @NotNull final String firstName,
            @NotNull final String lastName, @NotNull final String email, final LocalDate dateOfBirth) {
        super(source);
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

}
