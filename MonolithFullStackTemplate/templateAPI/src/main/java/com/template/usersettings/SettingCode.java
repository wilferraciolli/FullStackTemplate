package com.template.usersettings;

import org.apache.commons.lang3.EnumUtils;

import java.util.Objects;
import java.util.stream.Stream;

public enum SettingCode {
    LANGUAGE("Language"),
    LOCALE("Locale");

    private String description;

    SettingCode(final String description) {
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
     * @param settingCode The enum to check for its id.
     * @return the id of the enum or null if not valid.
     */
    public static String resolveId(SettingCode settingCode) {
        if (Objects.isNull(settingCode)) {
            return null;
        }

        return stream()
                .map(Enum::name)
                .filter(name -> name.equals(settingCode.name()))
                .findFirst()
                .orElse(null);
    }

    public static SettingCode resolveEnum(String valueToCheck) {
        if (EnumUtils.isValidEnum(SettingCode.class, valueToCheck)){
            return SettingCode.valueOf(valueToCheck);
        }

        return null;
    }

    /**
     * Stream stream.
     * @return the stream
     */
    public static Stream<SettingCode> stream() {
        return Stream.of(SettingCode.values());
    }
}
