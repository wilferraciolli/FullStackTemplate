package com.template.users;


import com.template.exceptions.EntityNotFoundException;
import com.template.libraries.core.EventPublisher;
import com.template.users.events.UserCreatedEvent;
import com.template.users.events.UserDeletedEvent;
import com.template.users.events.UserUpdatedEvent;
import com.template.users.user.User;
import com.template.users.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventPublisher eventPublisher;

    @Autowired
    private UserResourceAssembler assembler;

    @Transactional(propagation = Propagation.REQUIRED)
    public User createUser(final UserResource userResourceCreate) {
        final User user = assembler.convertToEntity(userResourceCreate);

        User createdUser = this.userRepository.save(user);

        this.publishUserCreatedEventWithPersonDetails(user.getId(), userResourceCreate);

        return createdUser;
    }

    public boolean checkUsernameAvailability(final String username) {

        return Long.valueOf(0L).equals(this.userRepository.checkUsernameExists(username));
    }

    public Optional<User> findById(final Long id) {

        return this.userRepository.findById(id);
    }

    public User updateUser(final Long id, final UserResource userResourcePayload) {

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

        return user;
    }

    public void deleteUserById(final Long id) {

        final User user = this.userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("could not find user for given id"));

        eventPublisher.publishEvent(UserDeletedEvent.builder()
                .userId(id)
                .build());
        this.userRepository.delete(user);
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
}
