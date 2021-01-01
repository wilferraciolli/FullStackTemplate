package com.template.people.events.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

import com.template.people.Person;
import com.template.people.PersonRepository;
import com.template.users.events.UserCreatedEvent;

/**
 * The type User created event handler.
 */
@Service
public class UserCreatedEventHandler implements ApplicationListener<UserCreatedEvent> {

    @Autowired
    private PersonRepository repository;

    @Override
    public void onApplicationEvent(final UserCreatedEvent event) {

        repository.save(Person.builder()
                .userId(event.getUserId())
                .firstName(event.getFirstName())
                .lastName(event.getLastName())
                .email(event.getEmail())
                .dateOfBirth(event.getDateOfBirth())
                .build());
    }

}
