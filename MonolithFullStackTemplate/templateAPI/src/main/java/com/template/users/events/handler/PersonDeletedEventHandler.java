package com.template.users.events.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.template.exceptions.EntityNotFoundException;
import com.template.people.events.PersonDeletedEvent;
import com.template.users.user.User;
import com.template.users.user.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class PersonDeletedEventHandler {

    @Autowired
    private UserRepository userRepository;

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handlePersonCreatedEvent(final PersonDeletedEvent personDeletedEvent) {

        final User user = this.userRepository.findById(personDeletedEvent.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));

        this.userRepository.delete(user);
    }
}
