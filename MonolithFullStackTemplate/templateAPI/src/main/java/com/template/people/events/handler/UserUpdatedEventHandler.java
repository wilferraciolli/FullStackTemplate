package com.template.people.events.handler;

import com.template.exceptions.EntityNotFoundException;
import com.template.people.Person;
import com.template.people.PersonRepository;
import com.template.users.events.UserUpdatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

/**
 * The type Use updated event handler.
 */
@Component
@Slf4j
public class UserUpdatedEventHandler {

    @Autowired
    private PersonRepository repository;

    @TransactionalEventListener
    public void handleUserUpdatedEvent(final UserUpdatedEvent event) {
// TODO not working, fix
        Person person = repository.findByUserId(event.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Could not find person for given user id"));

        //TODO no username/email changes to be allowed
        person.updatePersonDetails(event.getFirstName(), event.getLastName(), event.getEmail(), event.getDateOfBirth());
    }
}
