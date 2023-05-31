package com.template.users.details;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.template.users.details.UserDetailsView;

/**
 * The interface User details view repository.
 */
public interface UserDetailsViewRepository extends JpaRepository<UserDetailsView, Long> {

    Optional<UserDetailsView> findByPersonId(Long personId);

}
