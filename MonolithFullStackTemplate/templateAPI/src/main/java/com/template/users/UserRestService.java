package com.template.users;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.libraries.rest.BaseRestService;

/**
 * The type User rest service.
 */
@RestController()
@RequestMapping(value = "/users", produces = "application/json")
public class UserRestService extends BaseRestService {

    @Autowired
    private UserAppService appService;

    @Autowired
    private UserMetaFabricator metaFabricator;

    /**
     * Template response entity.
     * @return the response entity
     */
    @GetMapping("/template")
    public ResponseEntity<UserResource> template() {
        final UserResource resource = UserResource.builder()
                .firstName("")
                .lastName("")
                .username("")
                .password("")
                .roleIds(new ArrayList<>())
                .active(true)
                .build();

        return buildResponseOk(getJsonRootName(UserResource.class), resource, metaFabricator.createMetaForTemplate());
    }

    /**
     * Create response entity.
     * @param payload the payload
     * @return the response entity
     */
    @PostMapping("")
    public ResponseEntity<UserResource> create(@RequestBody @Valid final UserResource payload) {
        final UserResource createdResource = this.appService.create(payload);

        // TODO change to return the same as build response
        return ResponseEntity
                .created(buildLocationHeader(createdResource.getId()))
                .body(createdResource);
    }

    /**
     * Find all response entity.
     * @return the response entity
     */
    @GetMapping("")
    public ResponseEntity<UserResource> findAll() {

        final List<UserResource> resources = this.appService.findUsers();

        //TODO get the resource collection and add link to the collection
        //        final UserResourceResponseCollection<UserResourceResponse> response = new UserResourceResponseCollection<>(
        //                new CollectionModel<>(resources),
        //                UserResourceAssembler.createLinksToCollection(),
        //                this.metaFabricator.createMetaForCollectionResource());

        Set<String> usedRoleIds = resources.stream()
                .map(UserResource::getRoleIds)
                .flatMap(Collection::stream)
                .distinct()
                .collect(Collectors.toSet());

        return buildResponseOk(getJsonRootName(UserResource.class), resources, metaFabricator.createMetaForCollectionResource(usedRoleIds));
    }

    /**
     * Find by id response entity.
     * @param id the id
     * @return the response entity
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResource> findById(@PathVariable("id") final Long id) {

        final UserResource resource = this.appService.findById(id);

        // TODO add meta and links

        return buildResponseOk(getJsonRootName(UserResource.class), resource);
    }

    @GetMapping("/usernames/{username}/availability")
    public ResponseEntity<Boolean> checkUsernameAvailability(@PathVariable("username") final String username) {

        final boolean isAvailable = this.appService.checkUsernameAvailability(StringUtils.defaultString(username));

        return ResponseEntity
                .ok(isAvailable);
    }

    /**
     * Update response entity.
     * @param id the id
     * @param payload the payload
     * @return the response entity
     */
    @PreAuthorize(value = "hasRole('ROLE_ADMIN') or checkOwnerByUserId(#id)")
    @PutMapping("/{id}")
    public ResponseEntity<UserResource> update(@PathVariable("id") final Long id, @RequestBody @Valid final UserResource payload) {
        final UserResource updatedResource = this.appService.update(id, payload);

        // TODO add meta and links

        return buildResponseOk(getJsonRootName(UserResource.class), updatedResource);
    }

    /**
     * Delete by id response entity.
     * @param id the id
     * @return the response entity
     */
    @PreAuthorize(value = "hasRole('ROLE_ADMIN') or checkOwnerByUserId(#id)")
    @DeleteMapping("/{id}")
    public ResponseEntity deleteById(@PathVariable("id") final Long id) {
        this.appService.deleteById(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
