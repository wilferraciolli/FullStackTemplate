package com.template.libraries.core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventPublisher {

    @Autowired
    private ApplicationEventPublisher publisher;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void publishEvent(final Event event) {
        publisher.publishEvent(event);
    }
}
