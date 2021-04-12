package com.template.people;

import com.template.users.details.UserDetailsViewRepository;
import com.template.users.user.AuthenticatedUserService;
import org.springframework.stereotype.Component;

/**
 * The type Person permission access.
 */
@Component("personPermissionAccess")
public class PersonPermissionAccess {

    private UserDetailsViewRepository userDetailsViewRepository;
    private AuthenticatedUserService authenticatedUserService;

    /**
     * Instantiates a new Person permission access.
     * @param userDetailsViewRepository the user details view repository
     * @param authenticatedUserService the authenticated user service
     */
    public PersonPermissionAccess(UserDetailsViewRepository userDetailsViewRepository, AuthenticatedUserService authenticatedUserService) {
        this.userDetailsViewRepository = userDetailsViewRepository;
        this.authenticatedUserService = authenticatedUserService;
    }

    /**
     * Can see by person id boolean.
     * @param id the id
     * @return the boolean
     */
    public boolean checkOwnerByPersonId(Long id){

        return userDetailsViewRepository.findByPersonId(id)
                .isPresent();
    }
}
