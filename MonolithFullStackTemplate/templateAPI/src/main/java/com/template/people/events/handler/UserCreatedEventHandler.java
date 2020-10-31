/*
 * (c) Midland Software Limited 2019
 * Name     : UserCreatedEventHandler.java
 * Author   : ferraciolliw
 * Date     : 13 Nov 2019
 */
package com.template.people.events.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Service;

import com.template.people.PersonAppService;
import com.template.people.PersonResource;
import com.template.users.events.UserCreatedEvent;

/**
 * The type User created event handler.
 */
@Service
public class UserCreatedEventHandler implements ApplicationListener<UserCreatedEvent> {

    @Autowired
    private PersonAppService personAppService;

    @Override
    public void onApplicationEvent(final UserCreatedEvent event) {

        personAppService.create(PersonResource.builder()
                .userId(event.getUserId())
                .firstName(event.getFirstName())
                .lastName(event.getLastName())
                .email(event.getEmail())
                .dateOfBirth(event.getDateOfBirth())
                .build());
    }
}
