package com.template.people;

import java.util.Objects;
import java.util.stream.Stream;

/**
 * The enum Person marital status type.
 */
public enum PersonMaritalStatusType {

    /**
     * Single person marital status type.
     */
    SINGLE("Single"),
    /**
     * Married person marital status type.
     */
    MARRIED("Married"),
    /**
     * Divorced person marital status type.
     */
    DIVORCED("Divorced"),
    /**
     * Widow person marital status type.
     */
    WIDOW("Widow"),
    /**
     * Other person marital status type.
     */
    OTHER("Other");

    private String description;

    PersonMaritalStatusType(final String description) {
        this.description = description;
    }

    /**
     * Gets description.
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**+
     * Helper method to resold the id of the enum with null safe.
     * @param personMaritalStatusType The enum to check for its id.
     * @return the id of the enum or null if not valid.
     */
    public static String resolveId(PersonMaritalStatusType personMaritalStatusType) {

        if (Objects.isNull(personMaritalStatusType)){

            return null;
        }

        return stream()
                .filter(p -> p.name().equals(personMaritalStatusType.name()))
                .map(p -> p.name())
                .findFirst()
                .orElse(null);
    }

    /**
     * Stream stream.
     * @return the stream
     */
    public static Stream<PersonMaritalStatusType> stream() {
        return Stream.of(PersonMaritalStatusType.values());
    }
}
