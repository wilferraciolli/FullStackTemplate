package com.template.libraries.core.batching.schedule;


import com.template.exceptions.DomainException;
import com.template.libraries.core.EventScheduled;
import com.template.libraries.core.batching.events.IdTimerEvent;

import java.util.Arrays;

public enum ScheduledJobType {
    // Class to hold a list of timers and the class they should serialize to
    ID_TIMER("idTimer", IdTimerEvent.class);

    private final String jsonRootName;
    private final Class<? extends EventScheduled> classToSerializeTo;

    ScheduledJobType(String jsonRootName, Class<? extends EventScheduled> classToSerializeTo) {
        this.jsonRootName = jsonRootName;
        this.classToSerializeTo = classToSerializeTo;
    }

    public String getJsonRootName() {
        return jsonRootName;
    }

    public Class<? extends EventScheduled> getClassToSerializeTo() {
        return classToSerializeTo;
    }

    public static Class<? extends EventScheduled> getEventClass(String rootName) {
        return Arrays.stream(ScheduledJobType.values())
                .filter(v -> v.jsonRootName.equalsIgnoreCase(rootName))
                .map(ScheduledJobType::getClassToSerializeTo)
                .findFirst()
                .orElseThrow(() -> new DomainException("Could not find the class to parse Json onto, please add it to the list of known event schedule"));
    }
}
