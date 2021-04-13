package com.template.users.events;

import com.template.libraries.core.Event;
import lombok.Builder;
import lombok.Value;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * The type User created event.
 */
@Value
@Builder
public class UserDeletedEvent implements Event {

    @NotNull
    private Long userId;

}
