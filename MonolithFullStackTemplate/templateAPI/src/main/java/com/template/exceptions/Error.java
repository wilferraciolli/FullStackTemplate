package com.template.exceptions;

import static java.lang.String.valueOf;
import static java.util.Objects.nonNull;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Error {

    private Integer statusCode;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    //    @JsonSerialize(using = LocalDateTimeSerializer.class)
    private LocalDateTime dateTime;

    private String title;

    private List<PropertyField> fields;
}

class PropertyField {
    private String fieldName;
    private String fieldValue;
    private String message;

    public PropertyField(final String fieldName, final Object fieldValue, final String message) {
        this.fieldName = fieldName;
        this.fieldValue = nonNull(fieldValue) ? valueOf(fieldValue) : "";
        this.message = message;
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getFieldValue() {
        return fieldValue;
    }

    public String getMessage() {
        return message;
    }
}