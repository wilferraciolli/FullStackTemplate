package com.template.people.events;

import com.template.libraries.core.Event;
import lombok.Builder;
import lombok.Value;

import java.io.Serializable;

@Value
@Builder
public class PersonDeletedEvent implements Event {

    private Long id;

    private Long userId;

    private String email;
}
