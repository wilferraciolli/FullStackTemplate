package com.template.libraries.rest;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

/**
 * The type Response serializer.
 * This Serializer is to be used to produce responses with the root name of a DTO either being a collection or a single resource.
 */
public class ResponseSerializer extends JsonSerializer<Object> {

    @Override
    public void serialize(final Object value, final JsonGenerator jsonGenerator, final SerializerProvider provider)
            throws IOException {

        jsonGenerator.writeStartObject();
        jsonGenerator.writeObjectField(workOutRootName(value), workOutData(value));
        jsonGenerator.writeEndObject();
    }

    private Object workOutData(final Object value) {
        final PayloadData payloadData = (PayloadData) value;

        return payloadData.getData();
    }

    private String workOutRootName(final Object value) {
        final PayloadData payloadData = (PayloadData) value;

        return payloadData.getRootName();
    }

}
