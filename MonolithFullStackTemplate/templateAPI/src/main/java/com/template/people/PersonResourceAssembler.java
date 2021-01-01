/*
 * (c) Midland Software Limited 2019
 * Name     : PersonResourceAssembler.java
 * Author   : ferraciolliw
 * Date     : 09 Sep 2019
 */
package com.template.people;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The type Person resource assembler.
 */
@Service
public class PersonResourceAssembler {

    @Autowired
    private PersonLinkProvider linkProvider;

    /**
     * Convert to entity person.
     * @param payload the payload
     * @return the person
     */
    public Person convertToEntity(final PersonResource payload) {
        return Person.builder()
                .userId(payload.getUserId())
                .firstName(payload.getFirstName())
                .lastName(payload.getLastName())
                .email(payload.getEmail())
                .phoneNumber(payload.getPhoneNumber())
                .dateOfBirth(payload.getDateOfBirth())
                .gender(payload.getGenderId())
                .maritalStatus(payload.getMaritalStatusId())
                .numberOfDependants(payload.getNumberOfDependants())
                .build();
    }

    /**
     * Convert to dto person resource.
     * @param entity the entity
     * @return the person resource
     */
    public PersonResource convertToDTO(final Person entity) {

        PersonResource personResource = PersonResource.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .firstName(entity.getFirstName())
                .lastName(entity.getLastName())
                .email(entity.getEmail())
                .phoneNumber(entity.getPhoneNumber())
                .dateOfBirth(entity.getDateOfBirth())
                .genderId(entity.getGender())
                .maritalStatusId(entity.getMaritalStatus())
                .numberOfDependants(entity.getNumberOfDependants())
                .build();

        List<Link> linksToAdd = Arrays.asList(
                linkProvider.generateSelfLink(personResource.getId()),
                linkProvider.generateGetAllPeopleLink(),
                linkProvider.generateUpdateLink(personResource.getId()),
                linkProvider.generateDeleteLink(personResource.getId()));
        personResource.addLinks(linksToAdd);

        return personResource;
    }

}
