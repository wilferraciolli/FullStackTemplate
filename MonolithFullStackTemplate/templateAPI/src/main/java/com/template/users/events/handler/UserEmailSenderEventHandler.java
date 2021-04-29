package com.template.users.events.handler;

import com.template.libraries.mails.MailService;
import com.template.libraries.mails.NotificationEmail;
import com.template.people.Person;
import com.template.users.events.UserCreatedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
@Slf4j
@Transactional
public class UserEmailSenderEventHandler {

    @Autowired
    private MailService mailService;

    @TransactionalEventListener
    public void handleUserCreatedEvent(final UserCreatedEvent event) {

        log.error("handling user created event handler, sending email notification");

      sendEmailVerification(event.getUserId(), event.getEmail());
    }

    private void sendEmailVerification(final Long userId, final String username) {

        this.mailService.sendEmail(new NotificationEmail("Please active your account", username,
                "Please click on the link below to activate your account "
                        + "http://localhost:5001/api/auth/accountverification/"
                        + userId));
    }
}
