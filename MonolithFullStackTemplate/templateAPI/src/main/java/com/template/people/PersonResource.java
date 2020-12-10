package com.template.people;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.template.libraries.rest.BaseDTO;

import lombok.Builder;
import lombok.Value;

/**
 * The type Person resource.
 */
@Value
@Builder
@JsonTypeName("person")
//@JsonTypeInfo(include = JsonTypeInfo.As.WRAPPER_OBJECT, use = JsonTypeInfo.Id.NAME)
public class PersonResource extends BaseDTO {

    private Long id;

    private Long userId;

    @NotNull(message = "User name cannot be null.")
    private String firstName;

    @NotNull(message = "User name cannot be null.")
    private String lastName;

    @NotNull(message = "Email name cannot be null.")
    private String email;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    private PersonGenderType genderId;
    private PersonMaritalStatusType maritalStatusId;
    private Integer numberOfDependants;
    private String phoneNumber;

}
