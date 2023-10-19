package com.template.people.events;

import com.template.libraries.core.Event;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PersonImageRemovedEvent implements Event {
    private Long id;
}
