package com.template.users.events.handler;

import com.template.libraries.mails.MailService;
import com.template.libraries.mails.NotificationEmail;
import com.template.people.Person;
import com.template.security.authentication.events.UserRegisteredEvent;
import com.template.users.UserAppService;
import com.template.users.UserResource;
import com.template.users.UserRoleType;
import com.template.users.events.UserCreatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import static java.util.Arrays.asList;

/**
 * The type User registered event handler.
 */
@Service
@Slf4j
public class UserCreatedEmailMessageEventHandler {

    @Autowired
    private MailService mailService;

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleUserCreatedEvent(final UserCreatedEvent event) {

        log.info("Sending confirmation email when handling user created");

        sendEmailVerification(event.getUserId(), event.getEmail());
    }

    private void sendEmailVerification(final Long userId, final String username) {

        this.mailService.sendEmail(new NotificationEmail("Please active your account", username,
                "Please click on the link below to activate your account "
                        + "http://localhost:5001/api/auth/accountverification/"
                        + userId));
    }

}
