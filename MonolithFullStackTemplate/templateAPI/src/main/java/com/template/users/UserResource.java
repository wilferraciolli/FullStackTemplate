package com.template.users;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.template.libraries.rest.BaseDTO;
import com.template.libraries.rest.CustomNullSerializer;
import com.template.validation.ValidateUniqueEmail;
import com.template.validation.ValidateUniqueEmailValidator;
import com.template.validation.ValidateUniqueUsername;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * The type User resource.
 */
@JsonRootName("user")
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@ToString
@ValidateUniqueEmail(message = "{Users.username.NonUnique}") //TODO this fails to update current user with same email
public class UserResource extends BaseDTO {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("firstName")
    @NotNull
    @Size(max = 80, message = "First name cannot have more than {max} characters")
    private String firstName;

    @NotNull
    @Size(max = 80, message = "Last name cannot have more than {max} characters")
    private String lastName;

    @NotNull(message = "User name cannot be null.")
   // @ValidateUniqueUsername(message = "{Users.username.NonUnique}")
    private String username;

    //    @Pattern(regexp = "^[_A-Za-z0-9-\\\\+]+(\\\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\\\.[A-Za-z0-9]+)*(\\\\.[A-Za-z]{2,})$\"", message = "Email format is not valid: '${validatedValue}' does not matches the email patten}")
    //    private String email;

    @NotNull(message = "Password cannot be null.")
    private String password;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @JsonSerialize(nullsUsing = CustomNullSerializer.class)
    private LocalDate dateOfBirth;

    @NotNull(message = "Active cannot be null.")
    private Boolean active;

    @NotEmpty(message = "At least 1 role must be added to the user.")
    private List<String> roleIds;

}
