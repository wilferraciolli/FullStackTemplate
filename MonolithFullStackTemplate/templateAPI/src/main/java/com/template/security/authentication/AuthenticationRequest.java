package com.template.security.authentication;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonRootName;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Value;

/**
 * The type Authentication request.
 */
@JsonRootName("authentication")
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@ToString
public class AuthenticationRequest implements Serializable {

    @NotEmpty(message = "{user.email.blank}")
    @Email(message = "{user.email.invalidFormat}")
    private String username;

    @NotNull(message = "{user.password.null}")
    @Size(min = 5, max = 36, message = "Password must be between {min} and {max} characters long. Length found : ${validatedValue.length()}")
    private String password;
}
