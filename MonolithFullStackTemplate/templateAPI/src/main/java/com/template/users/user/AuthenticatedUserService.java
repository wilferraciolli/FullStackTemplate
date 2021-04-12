package com.template.users.user;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Bean created just to resolve the user logged on.
 */
@Service
public class AuthenticatedUserService {

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // TODO maybe this class could be extendd to return person details.
        return (User) authentication.getPrincipal();
    }
}
