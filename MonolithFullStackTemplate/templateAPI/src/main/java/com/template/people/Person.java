package com.template.people;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Person.
 */
@Entity
@Table(name = "tp_person")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long userId;

    private String imageId;

    @NotEmpty
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String email;

    @Enumerated(EnumType.STRING)
    private PersonGenderType gender;

    private String phoneNumber;

    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private PersonMaritalStatusType maritalStatus;

    private Integer numberOfDependants;

    /**
     * Update person.
     * @param personResource the person resource
     */
    public void updatePerson(final PersonResource personResource) {
        this.firstName = personResource.getFirstName();
        this.lastName = personResource.getLastName();
        this.email = personResource.getEmail();
        this.gender = personResource.getGenderId();
        this.phoneNumber = personResource.getPhoneNumber();
        this.dateOfBirth = personResource.getDateOfBirth();
        this.maritalStatus = personResource.getMaritalStatusId();
        this.numberOfDependants = personResource.getNumberOfDependants();
    }

    public void updatePersonDetails(final String firstName, final String lastName, final String email, final LocalDate dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    public void addImageId(String imageId){
        this.imageId = imageId;
    }

    public void removeImageId(){
        this.imageId = null;
    }
}
