package com.template.people.events;

import java.io.Serializable;
import java.time.LocalDate;

import com.template.libraries.core.Event;
import lombok.Builder;
import lombok.Value;
import org.springframework.context.ApplicationEvent;

@Value
@Builder
public class PersonUpdatedEvent implements Event {

    private Long id;

    private Long userId;

    private String firstName;

    private String lastName;

    private String email;

    private LocalDate dateOfBirth;

    private String genderId;

    private String maritalStatusId;

    private Integer numberOfDependants;

    private String phoneNumber;

}
