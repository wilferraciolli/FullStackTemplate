package com.template.people.events;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PersonDeletedEvent {

    private Long id;

    private Long userId;

    private String email;
}
