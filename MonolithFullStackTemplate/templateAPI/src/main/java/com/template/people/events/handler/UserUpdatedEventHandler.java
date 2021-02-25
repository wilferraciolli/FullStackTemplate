package com.template.people.events.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

import com.template.exceptions.EntityNotFoundException;
import com.template.people.Person;
import com.template.people.PersonAppService;
import com.template.people.PersonRepository;
import com.template.people.PersonResource;
import com.template.users.events.UserCreatedEvent;
import com.template.users.events.UserUpdatedEvent;

/**
 * The type Use updated event handler.
 */
@Service
public class UserUpdatedEventHandler implements ApplicationListener<UserUpdatedEvent> {

    @Autowired
    private PersonRepository repository;

    @Override
    public void onApplicationEvent(final UserUpdatedEvent event) {
// TODO not working, fix
        Person person = repository.findByUserId(event.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Could not find person for given user id"));

        //TODO no username/email changes to be allowed
        person.updatePersonDetails(event.getFirstName(), event.getLastName(), event.getEmail(), event.getDateOfBirth());
    }
}
