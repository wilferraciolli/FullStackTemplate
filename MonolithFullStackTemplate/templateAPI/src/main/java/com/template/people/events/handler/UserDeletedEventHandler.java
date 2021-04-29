package com.template.people.events.handler;

import com.template.exceptions.DomainException;
import com.template.people.PersonRepository;
import com.template.users.events.UserDeletedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

/**
 * The type User created event handler.
 */
@Component
@Slf4j
public class UserDeletedEventHandler {

    @Autowired
    private PersonRepository repository;

    @TransactionalEventListener
    public void handleUserDeletedEvent(final UserDeletedEvent event) {

        repository.findByUserId(event.getUserId())
                .ifPresentOrElse(p -> repository.delete(p),
                        () -> new DomainException(String.format("Could not find person for use %s", event.getUserId())));

    }

}
