package com.template.users;

import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.template.libraries.rest.BaseDTO;
import com.template.validation.ValidateUniqueUsername;

import lombok.Builder;
import lombok.Value;

/**
 * The type User resource.
 */
@Value
@Builder
@JsonRootName("user")
//@JsonTypeName("user")
//@JsonTypeInfo(include = JsonTypeInfo.As.WRAPPER_OBJECT, use = JsonTypeInfo.Id.MINIMAL_CLASS)
public class UserResource extends BaseDTO {

    private Long id;

    @NotNull
    @Size(max = 80, message = "First name cannot have more than {max} characters")
    private String firstName;

    @NotNull
    @Size(max = 80, message = "Last name cannot have more than {max} characters")
    private String lastName;

    @NotNull(message = "User name cannot be null.")
    @ValidateUniqueUsername(message = "{Users.username.NonUnique}")
    private String username;

    //    @Pattern(regexp = "^[_A-Za-z0-9-\\\\+]+(\\\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\\\.[A-Za-z0-9]+)*(\\\\.[A-Za-z]{2,})$\"", message = "Email format is not valid: '${validatedValue}' does not matches the email patten}")
    //    private String email;

    @NotNull(message = "Password cannot be null.")
    private String password;

    private LocalDate dateOfBirth;

    @NotNull(message = "Active cannot be null.")
    private Boolean active;

    @NotEmpty(message = "At least 1 role must be added to the user.")
    private List<String> roleIds;
}
