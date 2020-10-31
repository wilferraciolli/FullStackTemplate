/*
 * (c) Midland Software Limited 2019
 * Name     : UserDetailsViewRepository.java
 * Author   : ferraciolliw
 * Date     : 13 Nov 2019
 */
package com.template.users;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The interface User details view repository.
 */
public interface UserDetailsViewRepository extends JpaRepository<UserDetailsView, Long> {

}
