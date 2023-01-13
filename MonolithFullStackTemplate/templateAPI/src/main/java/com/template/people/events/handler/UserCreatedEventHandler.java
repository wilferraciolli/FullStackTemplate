package com.template.people.events.handler;

import com.template.people.Person;
import com.template.people.PersonRepository;
import com.template.users.events.UserCreatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

/**
 * The type User created event handler.
 */
@Component
@Slf4j
public class UserCreatedEventHandler {

    @Autowired
    private PersonRepository repository;

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleUserCreatedEvent(final UserCreatedEvent event) {

        log.info("handling user created");

        repository.save(Person.builder()
                .userId(event.getUserId())
                .firstName(event.getFirstName())
                .lastName(event.getLastName())
                .email(event.getEmail())
                .dateOfBirth(event.getDateOfBirth())
                .build());
    }

}
