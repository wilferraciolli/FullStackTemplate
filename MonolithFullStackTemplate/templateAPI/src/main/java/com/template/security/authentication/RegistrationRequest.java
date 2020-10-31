package com.template.security.authentication;

import java.time.LocalDate;

import com.template.validation.ValidateUniqueUsername;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Value;

/**
 * The type Registration request.
 */
@Value
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RegistrationRequest {

    @NotNull
    @Size(max = 80, message = "First name cannot have more than {max} characters")
    private String firstName;

    @NotNull
    @Size(max = 80, message = "Last name cannot have more than {max} characters")
    private String lastName;

    @NotNull(message = "Email cannot be null")
    @Email
    @ValidateUniqueUsername(message = "{Users.username.NonUnique}")
    private String email;

    @NotNull
    @Size(min = 5, max = 20, message = "Password must be between {min} and {max} characters long. Length found : ${validatedValue.length()}")
    private String password;

    private LocalDate dateOfBirth;
}
