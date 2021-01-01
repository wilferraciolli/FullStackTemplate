/*
 * (c) Midland Software Limited 2019
 * Name     : PersonRepository.java
 * Author   : ferraciolliw
 * Date     : 09 Sep 2019
 */
package com.template.people;

import java.util.Optional;

import javax.validation.constraints.NotNull;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The interface Person repository.
 */
public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findByUserId(@NotNull Long userId);
}
