package com.template.libraries.core.batching.events;


import com.fasterxml.jackson.annotation.JsonRootName;
import com.template.libraries.core.EventScheduled;

import java.util.Objects;

/**
 * Helper id timer to be used to create timers for given ids to expiry in the future.
 */
@JsonRootName("idTimer")
public class IdTimerEvent implements EventScheduled {

    private String id;

    public IdTimerEvent() {
    }

    public IdTimerEvent(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        IdTimerEvent that = (IdTimerEvent) o;

        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "IdTimerEvent{" +
                "id='" + id + '\'' +
                '}';
    }
}
