package com.template.people;

import java.time.LocalDate;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.template.libraries.rest.CustomNullSerializer;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.template.libraries.rest.BaseDTO;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Value;

/**
 * The type Person resource.
 */
@JsonRootName("person")
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@ToString
public class PersonResource extends BaseDTO {

    private Long id;

    private Long userId;

    @JsonSerialize(nullsUsing = CustomNullSerializer.class)
    private String imageId;

    @JsonProperty("firstName")
    @NotEmpty(message = "{user.firstName.blank}")
    @Size(max = 80, message = "{user.firstName.tooLong}")
    private String firstName;

    @NotEmpty(message = "{user.lastName.blank}")
    @Size(max = 80, message = "{user.lastName.tooLong}")
    private String lastName;

    @NotEmpty(message = "{user.email.blank}")
    @Email(message = "{user.email.invalidFormat}")
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;

    private PersonGenderType genderId;

    private PersonMaritalStatusType maritalStatusId;

    private Integer numberOfDependants;

    private String phoneNumber;

}
