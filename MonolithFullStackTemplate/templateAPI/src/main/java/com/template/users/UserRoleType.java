package com.template.users;

import java.util.stream.Stream;

/**
 * The enum User role type.
 */
public enum UserRoleType {

    /**
     * Role used to bypass security. Used for performing actions that are not related to a specific user.
     */
    ROLE_INTEGRATION("Integration user"),

    /**
     * Role admin user role type.
     */
    ROLE_ADMIN("Admin"),

    /**
     * The Role hr admin.
     */
    ROLE_HR_ADMIN("HR Admin"),

    /**
     * Role user user role type.
     */
    ROLE_USER("User");

    private String description;

    UserRoleType(final String description) {
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
     * Stream stream.
     * @return the stream
     */
    public static Stream<UserRoleType> stream() {
        return Stream.of(UserRoleType.values());
    }
}
