package com.template.users.profile;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.template.exceptions.DomainException;
import com.template.exceptions.EntityNotFoundException;
import com.template.people.PersonRestService;
import com.template.users.UserRoleType;
import com.template.users.details.UserDetailsView;
import com.template.users.details.UserDetailsViewRepository;
import com.template.users.UserRestService;
import com.template.users.user.User;
import com.template.users.user.UserRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * The type User profile app service.
 */
@Service
@Slf4j
public class UserProfileAppService {

    @Autowired
    private UserDetailsViewRepository userDetailsViewRepository;

    @Autowired
    private UserRepository useRepository;

    /**
     * Gets user profile.
     * @param userDetails the user details
     * @return the user profile
     */
    public UserProfileResource getUserProfile(final UserDetails userDetails) {

        if (Objects.isNull(userDetails)){
            throw new DomainException("No user passed on ");
        }

        final UserDetailsView userDetailsView = this.getUser(((User) userDetails).getId());
        final UserProfileResource userResource = this.buildUserProfileResource(userDetailsView);

        return userResource;
    }

    private UserProfileResource buildUserProfileResource(final UserDetailsView userDetailsView) {

        UserProfileResource user = UserProfileResource.builder()
                .id(userDetailsView.getId())
                .personId(userDetailsView.getPersonId())
                .firstName(userDetailsView.getFirstName())
                .lastName(userDetailsView.getLastName())
                .build();
        List<Link> linksToAdd = generateLinks(userDetailsView);
        user.addLinks(linksToAdd);

        return user;
    }

    private List<Link> generateLinks(UserDetailsView userDetailsView) {

        List<Link> linksToAdd = new ArrayList<>();
        linksToAdd.add(linkTo(UserProfileRestService.class).withSelfRel());

        if (hasRole(UserRoleType.ROLE_ADMIN.name())) {
            linksToAdd.add(linkTo(UserRestService.class).withRel("users"));
            linksToAdd.add(linkTo(PersonRestService.class).withRel("people"));
            linksToAdd.add(linkTo(methodOn(PersonRestService.class).findById(userDetailsView.getPersonId())).withRel("person"));
        } else if (userDetailsView.getId().equals(this.getUserId())) {
            // add owner links
            linksToAdd.add(linkTo(methodOn(PersonRestService.class).findById(userDetailsView.getPersonId())).withRel("person"));
        }

        return linksToAdd;
    }

    private UserDetailsView getUser(final Long userId) {

        return this.userDetailsViewRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));
    }

    private Long getUserId() {
        final String username;
        final Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        return this.useRepository.findByUsername(username)
                .map(User::getId)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));
    }

    public static Collection<SimpleGrantedAuthority> getUserRoles() {

        return (Collection<SimpleGrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();
    }

    public static boolean hasRole(final String roleName) {

        return SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(roleName));
    }

}
