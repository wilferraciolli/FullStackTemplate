package com.template.users;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
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
import com.template.libraries.rest.Metadata;

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
        final UserResource resource = appService.createTemplate();

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

        Map<String, Metadata> metadata = metaFabricator.createMetaForCreatedResource(createdResource.getRoleIds());

        // TODO change to return the same as build response
//        return ResponseEntity
//                .created(buildLocationHeader(createdResource.getId()))
//                .body(createdResource);

        return buildResponseCreated(getJsonRootName(UserResource.class), createdResource, metadata);
    }

    /**
     * Find all response entity.
     * @return the response entity
     */
    @GetMapping("")
    public ResponseEntity<UserResource> findAll() {

        final List<UserResource> resources = this.appService.findUsers();

        Set<String> usedRoleIds = appService.resolveUsedRoleIds(resources);
        Map<String, Metadata> metaForCollectionResource = metaFabricator.createMetaForCollectionResource(usedRoleIds);
        List<Link> metaLinks = appService.generateCollectionLinks();

        return buildResponseOk(getJsonRootName(UserResource.class), resources, metaForCollectionResource, metaLinks);
    }

    /**
     * Find by id response entity.
     * @param id the id
     * @return the response entity
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserResource> findById(@PathVariable("id") final Long id) {

        final UserResource resource = this.appService.findById(id);

        Map<String, Metadata> metadata = metaFabricator.createMetaForSingleResource();

        return buildResponseOk(getJsonRootName(UserResource.class), resource, metadata);
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

        Map<String, Metadata> metadata = metaFabricator.createMetaForSingleResource();

        return buildResponseOk(getJsonRootName(UserResource.class), updatedResource, metadata);
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
