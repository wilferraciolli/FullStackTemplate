package com.template.users.events.handler;

import com.template.security.authentication.events.UserRegisteredEvent;
import com.template.users.UserAppService;
import com.template.users.UserResource;
import com.template.users.UserRoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import static java.util.Arrays.asList;

/**
 * The type User registered event handler.
 */
@Service
public class UserRegisteredEventHandler {

    @Autowired
    private UserAppService userAppService;

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleUserRegisteredEvent(final UserRegisteredEvent event) {

        this.createUser(event);
    }

    private void createUser(final UserRegisteredEvent user) {

        // TODO this should trigger the user created event which would trigger the person created event, however not working

        this.userAppService.create(UserResource.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .username(user.getEmail())
                .password(user.getPassword())
                .dateOfBirth(user.getDateOfBirth())
                .active(true)
                .roleIds(asList(UserRoleType.ROLE_USER.name()))
                .build());
    }
}
