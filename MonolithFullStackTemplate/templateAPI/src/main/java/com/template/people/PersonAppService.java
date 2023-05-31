package com.template.people;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.template.people.events.PersonDeletedEvent;
import com.template.people.events.PersonUpdatedEvent;
import com.template.users.UserLinkProvider;

import lombok.extern.slf4j.Slf4j;

/**
 * The type Person app service.
 */
@Service
@Transactional
@Slf4j
public class PersonAppService {

    @Autowired
    private PersonRepository repository;

    @Autowired
    private PersonResourceAssembler assembler;

    @Autowired
    private ApplicationEventPublisher publisher;

    @Autowired
    private UserLinkProvider linkProvider;

    /**
     * Find all list.
     * @return the list
     */
    public List<PersonResource> findAll() {

        return repository.findAll().stream()
                .map(assembler::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PersonResource> search(final String query) {

        return repository.searchByNameAndSurname(query)
                .stream()
                .map(assembler::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Find by id person resource.
     * @param id the id
     * @return the person resource
     */
    public PersonResource findById(final Long id) {
        final Person person = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException());

        return assembler.convertToDTO(person);
    }

    /**
     * Update person resource. This method requires a new transaction to be created as
     * the the publisher and listener of events will be handled at the same time.
     * @param id the id
     * @param PersonResource the person resource
     * @return the person resource
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public PersonResource update(final Long id, @Valid final PersonResource PersonResource) {
        final Person person = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException());

        person.updatePerson(PersonResource);
        repository.save(person);
        publishPersonUpdatedEvent(person);

        log.error("Sending event person updated " + person.toString());

        return assembler.convertToDTO(person);
    }

    /**
     * Delete by id.
     * @param id the id
     */
    // TODO remove this method as
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(final Long id) {
        final Person person = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException());

        repository.delete(person);
        publisher.publishEvent(PersonDeletedEvent.builder()
                .id(id)
                .userId(person.getUserId())
                .email(person.getEmail())
                .build());
    }

    public Set<String> resolveMaritalStatusesIds(List<PersonResource> resources) {

        return resources.stream()
                .filter(p -> Objects.nonNull(p.getMaritalStatusId()))
                .map(p -> p.getMaritalStatusId().name())
                .collect(Collectors.toSet());
    }

    public Set<String> resolveGenderIds(List<PersonResource> resources) {

        return resources.stream()
                .filter(p -> Objects.nonNull(p.getGenderId()))
                .map(p -> p.getGenderId().name())
                .collect(Collectors.toSet());
    }

    public List<Link> generateCollectionLinks() {
        List<Link> links = new ArrayList<>();
        links.add(linkProvider.generateCreateUserLink());

        return links;
    }

    private void publishPersonUpdatedEvent(final Person person) {

        PersonUpdatedEvent personUpdatedEvent = PersonUpdatedEvent.builder()
                .id(person.getId())
                .firstName(person.getFirstName())
                .lastName(person.getLastName())
                .email(person.getEmail())
                .dateOfBirth(person.getDateOfBirth())
                .genderId(PersonGenderType.resolveId(person.getGender()))
                .maritalStatusId(PersonMaritalStatusType.resolveId(person.getMaritalStatus()))
                .numberOfDependants(person.getNumberOfDependants())
                .phoneNumber(person.getPhoneNumber())
                .build();

        publisher.publishEvent(personUpdatedEvent);
    }

}
