package com.template.users.events.handler;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.template.people.events.PersonUpdatedEvent;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PersonUpdatedEventHandler {

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handlePersonCreatedEvent(final PersonUpdatedEvent personUpdatedEvent) {

        //TODO implement person updated event
        log.info(String.format("Person updated event handler %s", personUpdatedEvent.getEmail()));
    }
}
