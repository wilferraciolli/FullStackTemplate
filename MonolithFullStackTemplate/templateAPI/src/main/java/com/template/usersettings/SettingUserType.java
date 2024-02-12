package com.template.usersettings;

import org.apache.commons.lang3.EnumUtils;

import java.util.Objects;
import java.util.stream.Stream;

public enum SettingUserType {
    USER("User generated"),
    SYSTEM("System generated");

    private String description;

    SettingUserType(final String description) {
        this.description = description;
    }

    /**
     * Gets description.
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * +
     * Helper method to resolve the id of the enum with null safe.
     * @param settingUserType The enum to check for its id.
     * @return the id of the enum or null if not valid.
     */
    public static String resolveId(SettingUserType settingUserType) {
        if (Objects.isNull(settingUserType)) {
            return null;
        }

        return stream()
                .map(Enum::name)
                .filter(name -> name.equals(settingUserType.name()))
                .findFirst()
                .orElse(null);
    }

    public static SettingUserType resolveEnum(String valueToCheck) {
        if (EnumUtils.isValidEnum(SettingUserType.class, valueToCheck)){
            return SettingUserType.valueOf(valueToCheck);
        }

        return null;
    }

    /**
     * Stream stream.
     * @return the stream
     */
    public static Stream<SettingUserType> stream() {
        return Stream.of(SettingUserType.values());
    }
}

