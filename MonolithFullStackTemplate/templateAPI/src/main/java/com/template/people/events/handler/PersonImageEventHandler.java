package com.template.people.events.handler;


import com.template.people.PersonRepository;
import com.template.people.events.PersonImageAddedEvent;
import com.template.people.events.PersonImageRemovedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
public class PersonImageEventHandler {
    @Autowired
    private PersonRepository repository;

    // TODO event handlers not working

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handlePersonImageAddedEvent(final PersonImageAddedEvent event) {
        log.info("handling PersonImageAddedEvent");

        repository.findById(event.getId())
                .ifPresent(person -> {
                    person.addImageId(event.getImageId());
                    repository.save(person);
                });
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handlePersonImageRemovedEvent(final PersonImageRemovedEvent event) {
        log.info("handling PersonImageRemovedEvent");

        repository.findById(event.getId())
                .ifPresent(person -> {
                    person.removeImageId();
                    repository.save(person);
                });
    }
}
