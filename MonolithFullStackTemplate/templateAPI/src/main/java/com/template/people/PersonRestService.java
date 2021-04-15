package com.template.people;

import static org.springframework.http.ResponseEntity.noContent;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.Link;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.template.libraries.rest.BaseRestService;
import com.template.libraries.rest.Metadata;
import com.template.users.UserResource;

/**
 * The type Person rest controller.
 */
@RestController
@RequestMapping(value = "/hrm/people", produces = MediaType.APPLICATION_JSON_VALUE)
public class PersonRestService extends BaseRestService {

    @Autowired
    private PersonAppService appService;

    @Autowired
    private PersonMetaFabricator metaFabricator;

    /**
     * Find all response entity.
     * @return the response entity
     */
    @GetMapping("")
    public ResponseEntity<PersonResource> findAll() {

        final List<PersonResource> resources = appService.findAll();

        Map<String, Metadata> metaForCollectionResource = metaFabricator.createMetaForCollectionResource(
                appService.resolveMaritalStatusesIds(resources),
                appService.resolveGenderIds(resources));
        List<Link> metaLinks = appService.generateCollectionLinks();

        return buildResponseOk(getJsonRootName(PersonResource.class), resources, metaForCollectionResource, metaLinks);
    }

    @GetMapping("/search")
    public ResponseEntity<PersonResource> search(@RequestParam String query) {

        final List<PersonResource> resources = appService.search(StringUtils.defaultString(query));

        Map<String, Metadata> metaForCollectionResource = metaFabricator.createMetaForCollectionResource(
                appService.resolveMaritalStatusesIds(resources),
                appService.resolveGenderIds(resources));
        List<Link> metaLinks = appService.generateCollectionLinks();

        return buildResponseOk(getJsonRootName(PersonResource.class), resources, metaForCollectionResource);
    }


    /**
     * Find by id response entity.
     * @param id the id
     * @return the response entity
     */
    @GetMapping("/{id}")
    @PreAuthorize(value = "hasRole('ROLE_ADMIN') or @personPermissionAccess.checkOwnerByPersonId(#id)")
    public ResponseEntity<PersonResource> findById(@PathVariable final Long id) {

        final PersonResource resource = appService.findById(id);

        Map<String, Metadata> metadata = metaFabricator.createMetaForSingleResource();

        return buildResponseOk(getJsonRootName(PersonResource.class), resource, metadata);
    }

    /**
     * Update response entity.
     * @param id the id
     * @param personFromRequest the person from request
     * @return the response entity
     */
    @PutMapping("/{id}")
    public ResponseEntity<PersonResource> update(@PathVariable("id") final Long id,
            @RequestBody @Valid final PersonResource personFromRequest) {
        final PersonResource updatedResource = appService.update(id, personFromRequest);

        Map<String, Metadata> metadata = metaFabricator.createMetaForSingleResource();

        return buildResponseOk(getJsonRootName(UserResource.class), updatedResource, metadata);
    }

    /**
     * Delete response entity.
     * @param id the id
     * @return the response entity
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(value = "hasRole('ROLE_ADMIN') and @personPermissionAccess.notSelfByPersonId(#id)")
    public ResponseEntity<?> deleteById(@PathVariable("id") final Long id) {
        appService.deleteById(id);

        return noContent().build();
    }
}
