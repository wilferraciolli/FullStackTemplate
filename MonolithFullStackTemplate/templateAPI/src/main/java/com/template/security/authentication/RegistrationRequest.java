package com.template.security.authentication;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotNull;

import com.template.validation.ValidateUniqueUsername;


import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Value;

/**
 * The type Registration request.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@ToString
public class RegistrationRequest {

    @NotEmpty(message = "{user.firstName.blank}")
    @Size(max = 80, message = "{user.firstName.tooLong}")
    private String firstName;

    @NotEmpty(message = "{user.lastName.blank}")
    @Size(max = 80, message = "{user.lastName.tooLong}")
    private String lastName;

    @NotEmpty(message = "{user.email.blank}")
    @Email(message = "{user.email.invalidFormat}")
    @ValidateUniqueUsername(message = "{Users.username.NonUnique}")
    private String email;

    @NotNull(message = "{user.password.null}")
    @Size(min = 5, max = 36, message = "Password must be between {min} and {max} characters long. Length found : ${validatedValue.length()}")
    private String password;

    private LocalDate dateOfBirth;
}
