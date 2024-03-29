package com.template.users.details;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import org.hibernate.annotations.Immutable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type User.
 * Tis entity is used by Spring security framework to validate users.
 */
@Entity
@Table(name = "tp_user_details_view")
@Immutable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsView implements Serializable {
    static final long serialVersionUID = 5760906656094861485L;

    @Id
    private Long id;
    private Long personId;
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private LocalDate dateOfBirth;
    private Boolean active;

    // This is not working right
//    private Set<String> roleIds;

}
