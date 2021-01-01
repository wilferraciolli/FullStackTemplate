package com.template.people;

import java.util.Objects;
import java.util.stream.Stream;

/**
 * The enum Person gender type.
 */
public enum PersonGenderType {

    /**
     * Male person gender type.
     */
    MALE("Male"),
    /**
     * Female person gender type.
     */
    FEMALE("Female"),

    /**
     * The Prefer not to say.
     */
    PREFER_NOT_TO_SAY("Prefer not to say"),
    /**
     * Other person gender type.
     */
    OTHER("Other");

    private String description;

    PersonGenderType(final String description) {
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
     * @param personGenderType The enum to check for its id.
     * @return the id of the enum or null if not valid.
     */
    public static String resolveId(PersonGenderType personGenderType) {

        if (Objects.isNull(personGenderType)){

            return null;
        }

        return stream()
                .filter(p -> p.name().equals(personGenderType.name()))
                .map(p -> p.name())
                .findFirst()
                .orElse(null);
    }

    /**
     * Stream stream.
     * @return the stream
     */
    public static Stream<PersonGenderType> stream() {
        return Stream.of(PersonGenderType.values());
    }

}
