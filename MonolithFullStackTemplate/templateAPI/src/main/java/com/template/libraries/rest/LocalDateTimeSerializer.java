package com.template.libraries.rest;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Converts A LocaoDateTime to either UTC string.
 */
public class LocalDateTimeSerializer extends StdSerializer<LocalDateTime> {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'");

    public LocalDateTimeSerializer() {
        super(LocalDateTime.class);
    }

    @Override
    public void serialize(final LocalDateTime localDateTime,
                          final JsonGenerator generator,
                          final SerializerProvider provider) throws IOException {
        if (localDateTime != null) {
            ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneOffset.UTC);
            generator.writeObject(formatter.format(zonedDateTime));
        } else {
            generator.writeNull();
        }
    }
}
