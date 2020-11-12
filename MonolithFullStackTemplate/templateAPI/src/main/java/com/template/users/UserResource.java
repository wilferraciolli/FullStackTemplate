package com.template.users;

import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.template.libraries.rest.BaseDTO;
import com.template.validation.ValidateUniqueUsername;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Value;

/**
 * The type User resource.
 */
//@AllArgsConstructor
//@Value
//@Builder
@JsonRootName("user")
//@JsonTypeName("user")
//@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserResource extends BaseDTO {

    //@JsonProperty("id")
    private Long id;

    @JsonProperty("firstName")
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

    public UserResource(Long id,
            @NotNull @Size(max = 80, message = "First name cannot have more than {max} characters") String firstName,
            @NotNull @Size(max = 80, message = "Last name cannot have more than {max} characters") String lastName,
            @NotNull(message = "User name cannot be null.") String username,
            @NotNull(message = "Password cannot be null.") String password, LocalDate dateOfBirth,
            @NotNull(message = "Active cannot be null.") Boolean active,
            @NotEmpty(message = "At least 1 role must be added to the user.") List<String> roleIds) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.active = active;
        this.roleIds = roleIds;
    }

    public UserResource() {

        this.id =null;
        this.firstName =null;
        this.lastName =null;
        this.username =null;
        this.password =null;
        this.dateOfBirth =null;
        this.active =null;
        this.roleIds =null;
    }

    private UserResource(Builder builder) {
        this.id = builder.id;
        this.firstName = builder.firstName;
        this.lastName = builder.lastName;
        this.username = builder.username;
        this.password = builder.password;
        this.dateOfBirth = builder.dateOfBirth;
        this.active = builder.active;
        this.roleIds = builder.roleIds;
    }

    public static Builder builder() {
        return new Builder();
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Boolean getActive() {
        return active;
    }

    public List<String> getRoleIds() {
        return roleIds;
    }

    public static final class Builder {
        private Long id;
        private @NotNull @Size(max = 80, message = "First name cannot have more than {max} characters") String firstName;
        private @NotNull @Size(max = 80, message = "Last name cannot have more than {max} characters") String lastName;
        private @NotNull(message = "User name cannot be null.") String username;
        private @NotNull(message = "Password cannot be null.") String password;
        private LocalDate dateOfBirth;
        private @NotNull(message = "Active cannot be null.") Boolean active;
        private @NotEmpty(message = "At least 1 role must be added to the user.") List<String> roleIds;

        private Builder() {
        }

        public UserResource build() {
            return new UserResource(this);
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder password(String password) {
            this.password = password;
            return this;
        }

        public Builder dateOfBirth(LocalDate dateOfBirth) {
            this.dateOfBirth = dateOfBirth;
            return this;
        }

        public Builder active(Boolean active) {
            this.active = active;
            return this;
        }

        public Builder roleIds(List<String> roleIds) {
            this.roleIds = roleIds;
            return this;
        }
    }
}
