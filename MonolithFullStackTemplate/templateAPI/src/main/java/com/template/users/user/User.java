package com.template.users.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.toList;

/**
 * The type User.
 * Tis entity is used by Spring security framework to validate users.
 */
@Entity
@Table(name = "tp_user")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@NamedQuery(name = "User.checkUsernameExists", query = "SELECT COUNT(u.id) FROM User u WHERE u.username = :username")
@NamedQuery(name = "User.checkUsernameIsAvailableIgnoringSelf", query = "SELECT CASE WHEN COUNT(u.id) = 0 THEN true ELSE false END FROM User u " +
        "WHERE u.username = :username AND u.id != :id")
public class User implements UserDetails {

    private static final long serialVersionUID = 4076308342289028053L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String username;

    @NotEmpty
    private String password;

    private Boolean active;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "tp_user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    @Column(name = "role")
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    //    @OneToOne(cascade = CascadeType.ALL)
    //    @JoinColumn(name = "personId", referencedColumnName = "id")
    //    PersonNew person;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(toList());
    }

    @Deprecated
    public void updateUser(final String username, final String password, final boolean active, final List<String> roles) {
        this.username = username;
        this.password = password;
        this.active = active;
        this.roles = roles;
    }

    public void updateUser(final String username, final boolean active, final List<String> roles) {
        this.username = username;
        this.active = active;
        this.roles = roles;
    }

    public void activateAccount() {
        this.active = true;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.active;
    }
}
