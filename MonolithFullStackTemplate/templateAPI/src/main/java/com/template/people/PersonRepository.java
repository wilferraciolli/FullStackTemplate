package com.template.people;

import java.util.List;
import java.util.Optional;

import jakarta.validation.constraints.NotNull;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * The interface Person repository.
 */
public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByUserId(@NotNull Long userId);

    //TODO this query is not working
    @Query("SELECT p FROM Person p WHERE p.firstName LIKE %:query%"
            + " ORDER BY p.firstName ASC")
    List<Person> searchByNameAndSurname(String query);

//            + " OR p.lastName LIKE %:query% "
}
