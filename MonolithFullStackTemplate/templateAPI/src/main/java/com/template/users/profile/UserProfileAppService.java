package com.template.users.profile;

import com.template.exceptions.DomainException;
import com.template.exceptions.EntityNotFoundException;
import com.template.libraries.rest.LinkBuilder;
import com.template.people.PersonRestService;
import com.template.users.UserRestService;
import com.template.users.UserRoleType;
import com.template.users.details.UserDetailsView;
import com.template.users.details.UserDetailsViewRepository;
import com.template.users.user.User;
import com.template.users.user.UserRepository;
import com.template.usersettings.UserSettingRestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.Link;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * The type User profile app service.
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class UserProfileAppService {

    private final UserDetailsViewRepository userDetailsViewRepository;

    private final UserRepository useRepository;

    private final LinkBuilder linkBuilder;

    /**
     * Gets user profile.
     * @param userDetails the user details
     * @return the user profile
     */
    public UserProfileResource getUserProfile(final UserDetails userDetails) {
        if (Objects.isNull(userDetails)) {
            throw new DomainException("No user passed on ");
        }

        final UserDetailsView userDetailsView = this.getUser(((User) userDetails).getId());
        final UserProfileResource userResource = this.buildUserProfileResource(userDetails, userDetailsView);

        return userResource;
    }

    private UserProfileResource buildUserProfileResource(final UserDetails userDetails, final UserDetailsView userDetailsView) {
        UserProfileResource user = UserProfileResource.builder()
                .id(userDetailsView.getId())
                .personId(userDetailsView.getPersonId())
                .username(userDetailsView.getUsername())
                .firstName(userDetailsView.getFirstName())
                .lastName(userDetailsView.getLastName())
                .roleIds(userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .toList())
                .build();
        List<Link> linksToAdd = generateLinks(userDetailsView);
        user.addLinks(linksToAdd);

        return user;
    }

    private List<Link> generateLinks(UserDetailsView userDetailsView) {
        List<Link> linksToAdd = new ArrayList<>();

        linksToAdd.add(linkBuilder.buildSelfLink(
                UserProfileRestService.class,
                "getUserProfile"
        ));

        if (hasRole(UserRoleType.ROLE_ADMIN.name())) {
            linksToAdd.add(linkBuilder.buildLink(
                    UserRestService.class,
                    "findAll",
                    "users"));
            linksToAdd.add(linkBuilder.buildLink(
                    PersonRestService.class,
                    "findAll",
                    "people"));
        }

        if (userDetailsView.getId().equals(this.getUserId())
                || hasRole(UserRoleType.ROLE_ADMIN.name())) {
            linksToAdd.add(linkBuilder.buildLink(
                    PersonRestService.class,
                    "findById",
                    "person",
                    Map.of("id", userDetailsView.getPersonId())));

            linksToAdd.add(linkBuilder.buildLink(
                    UserSettingRestService.class,
                    "getAllSettingsForUser",
                    "userSettings",
                    Map.of("userId", userDetailsView.getId())));
        }

        return linksToAdd;
    }

    private UserDetailsView getUser(final Long userId) {
        return this.userDetailsViewRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));
    }

    private Long getUserId() {
        // TODO replace this witht he Thread Context Holder
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
