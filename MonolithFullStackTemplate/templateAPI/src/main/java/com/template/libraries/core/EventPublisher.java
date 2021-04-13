package com.template.libraries.core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class EventPublisher {

   @Autowired
   private ApplicationEventPublisher publisher;

    public void publishEvent(final Event event) {

        publisher.publishEvent(event);
    }
}
