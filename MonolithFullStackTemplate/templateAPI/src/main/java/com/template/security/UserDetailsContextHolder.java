package com.template.security;

import com.template.users.details.UserDetailsView;

import java.util.List;

/**
 * Class to hold the Thread Context of a user within a request,
 * this is set within the Thread when the request is made and cleared once the request resolves.
 */
public class UserDetailsContextHolder {
    private static final ThreadLocal<UserContextVO> userDetailsContext = new ThreadLocal<>();

    public static void setUserDetailsContext(UserContextVO userDetails) {
        userDetailsContext.set(userDetails);
    }

    public static UserContextVO getUserDetailsContext() {
        return userDetailsContext.get();
    }

    public static Long id() {
        return userDetailsContext.get().id();
    }

    public static Long personId() {
        return userDetailsContext.get().personId();
    }

    public static Boolean isActive() {
        return userDetailsContext.get().active();
    }

    public static String getUsername() {
        return userDetailsContext.get().username();
    }

    public static Boolean hasRole(String roleToMatch) {
        return userDetailsContext.get().userRoles().stream()
                .anyMatch(roleToMatch::equals);
    }

    public static List<String> getRoles() {
        return userDetailsContext.get().userRoles();
    }

    public static void clearUserContext() {
        userDetailsContext.remove();
    }

}
