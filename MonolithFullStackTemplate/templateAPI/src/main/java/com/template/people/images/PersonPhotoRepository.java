package com.template.people.images;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PersonPhotoRepository extends JpaRepository<PersonPhoto, Long> {

    Optional<PersonPhoto> findByUserId(Long userId);
}
