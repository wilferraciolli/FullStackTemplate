package com.template.users.user;

import java.util.List;
import java.util.Optional;

import com.template.people.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * The interface User repository.
 * This repository is used by Spring framework to resolve users and roles.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find by username optional.
     * @param username the username
     * @return the optional
     */
    Optional<User> findByUsername(String username);

    /**
     * Check username exists boolean.
     * @param username the username
     * @return the boolean
     */
    Long checkUsernameExists(String username);

    Boolean checkUsernameIsAvailableIgnoringSelf(String username, Long id);
}
