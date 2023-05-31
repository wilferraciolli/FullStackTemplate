package com.template.users;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.Valid;

import com.template.users.events.UserDeletedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.hateoas.Link;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.template.exceptions.EntityNotFoundException;
import com.template.libraries.core.EventPublisher;
import com.template.libraries.mails.MailService;
import com.template.libraries.mails.NotificationEmail;
import com.template.users.details.UserDetailsView;
import com.template.users.details.UserDetailsViewRepository;
import com.template.users.events.UserCreatedEvent;
import com.template.users.events.UserUpdatedEvent;
import com.template.users.user.User;
import com.template.users.user.UserRepository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * The type User app service.
 */
@Service
public class UserAppService {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsViewRepository userDetailsViewRepository;

    @Autowired
    private UserResourceAssembler assembler;

    @Autowired
    private UserLinkProvider linkProvider;

    @Autowired
    private EventPublisher eventPublisher;

    public UserResource createTemplate() {

        return UserResource.builder()
                .firstName("Name")
                .lastName("Surname")
                .username("user1@wiltech.com")
                .password("password1")
                .roleIds(Arrays.asList(UserRoleType.ROLE_USER.name()))
                .active(true)
                .build();
    }

    /**
     * Find users list.
     * @return the list
     */
    public List<UserResource> findUsers() {

        return this.userDetailsViewRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Create user resource.
     * @param userResourceCreate the user resource create
     * @return the user resource
     */
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public UserResource create(@Valid final UserResource userResourceCreate) {
        final User user = assembler.convertToEntity(userResourceCreate);
        this.userRepository.save(user);

        this.publishUserCreatedEventWithPersonDetails(user.getId(), userResourceCreate);

        return this.transpose(user);
    }

    /**
     * Find by id user resource.
     * @param id the id
     * @return the user resource
     */
    public UserResource findById(final Long id) {

        final UserDetailsView user = this.userDetailsViewRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));

        return this.convertToDTO(user);
    }

    public boolean checkUsernameAvailability(final String username) {

        return Long.valueOf(0L).equals(this.userRepository.checkUsernameExists(username));
    }

    /**
     * Update user resource.
     * @param id the id
     * @param userResourcePayload the user resource payload
     * @return the user resource
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public UserResource update(final Long id, final UserResource userResourcePayload) {
        final User user = this.userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));

        user.updateUser(userResourcePayload.getUsername(),
                userResourcePayload.getActive(), userResourcePayload.getRoleIds());
        this.userRepository.save(user);

        this.eventPublisher.publishEvent(UserUpdatedEvent.builder()
                .userId(id)
                .firstName(userResourcePayload.getFirstName())
                .lastName(userResourcePayload.getLastName())
                .email(userResourcePayload.getUsername())
                .dateOfBirth(userResourcePayload.getDateOfBirth())
                .build());

        return this.transpose(user);
    }

    /**
     * Delete user buy id.
     * @param id the id
     */
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(final Long id) {
        final User user = this.userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));

        eventPublisher.publishEvent(UserDeletedEvent.builder()
                .userId(id)
                .build());
        this.userRepository.delete(user);
    }

    public List<Link> generateCollectionLinks() {

        List<Link> links = new ArrayList<>();
        links.add(linkProvider.generateCreateUserLink());

        return links;
    }

    public Set<String> resolveUsedRoleIds(List<UserResource> resources) {

        return resources.stream()
                .map(UserResource::getRoleIds)
                .flatMap(Collection::stream)
                .collect(Collectors.toSet());
    }

    private void publishUserCreatedEventWithPersonDetails(final Long userId, final UserResource userResourceCreated) {

        this.eventPublisher.publishEvent(
                UserCreatedEvent.builder()
                        .userId(userId)
                        .firstName(userResourceCreated.getFirstName())
                        .lastName(userResourceCreated.getLastName())
                        .email(userResourceCreated.getUsername())
                        .dateOfBirth(userResourceCreated.getDateOfBirth())
                        .build());
    }

    private UserResource convertToDTO(final UserDetailsView userDetailsView) {

        UserResource userResource = this.assembler.convertToDTO(userDetailsView, this.resolveUserRoles(userDetailsView));

        List<Link> linksToAdd = Arrays.asList(linkProvider.generateSelfLink(userResource.getId()), linkProvider.generateUpdateLink(userResource.getId()), linkProvider.generateDeleteLink(userResource.getId()));
        userResource.addLinks(linksToAdd);

        return userResource;
    }

    private UserResource transpose(final User user) {
        final UserResource userResource = UserResource.builder()
                .id(user.getId())
                .username(user.getUsername())
                //                .email(user.getUsername())
                .password(user.getPassword())
                .active(user.getActive())
                .roleIds(user.getRoles())
                .build();

        List<Link> linksToAdd = Arrays.asList(linkProvider.generateSelfLink(userResource.getId()), linkProvider.generateUpdateLink(userResource.getId()), linkProvider.generateDeleteLink(userResource.getId()));
        userResource.addLinks(linksToAdd);

        return userResource;
    }

    private List<String> resolveUserRoles(final UserDetailsView userDetailsView) {

        return this.userDetailsService.loadUserByUsername(userDetailsView.getUsername()).getAuthorities()
                .stream()
                .map(role -> role.getAuthority())
                .collect(Collectors.toList());
    }
}
