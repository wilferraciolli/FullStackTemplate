package com.template.people.events;

import com.template.libraries.core.Event;
import lombok.Builder;
import lombok.Value;

import java.io.Serializable;

@Value
@Builder
public class PersonImageAddedEvent implements Event {

    private Long id;
    private String imageId;
}
