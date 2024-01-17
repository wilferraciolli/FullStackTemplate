package com.template.people;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.template.libraries.rest.LinkBuilder;
import com.template.people.images.PersonPhotoLinkProvider;
import com.template.security.UserDetailsContextHolder;
import com.template.users.UserRoleType;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

/**
 * The type Person resource assembler.
 */
@Service
@RequiredArgsConstructor
public class PersonResourceAssembler {

    private final PersonLinkProvider linkProvider;

    private final PersonPhotoLinkProvider personPhotoLinkProvider;

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
                .imageId(entity.getImageId())
                .phoneNumber(entity.getPhoneNumber())
                .dateOfBirth(entity.getDateOfBirth())
                .genderId(entity.getGender())
                .maritalStatusId(entity.getMaritalStatus())
                .numberOfDependants(entity.getNumberOfDependants())
                .build();

        List<Link> linksToAdd = new ArrayList<>();
        linksToAdd.add(linkProvider.generateSelfLink(personResource.getId()));
        linksToAdd.add(linkProvider.generateGetAllPeopleLink());
        linksToAdd.add(linkProvider.generateUpdateLink(personResource.getId()));
        linksToAdd.add(linkProvider.generateDeleteLink(personResource.getId()));

        if (StringUtils.isNotEmpty(personResource.getImageId())) {
            linksToAdd.add(personPhotoLinkProvider.generateDownloadLink(personResource.getId(), personResource.getImageId()));
        }

        // add person photo edit if same
        if (UserDetailsContextHolder.hasRole(UserRoleType.ROLE_HR_ADMIN.name())
                || UserDetailsContextHolder.personId().equals(personResource.getId())) {
            linksToAdd.add(personPhotoLinkProvider.createUpdateImageLink(personResource.getId()));
        }

        personResource.addLinks(linksToAdd);

        return personResource;
    }

}
