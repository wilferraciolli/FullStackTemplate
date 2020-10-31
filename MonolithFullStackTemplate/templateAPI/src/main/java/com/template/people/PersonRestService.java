package com.template.people;

import static org.springframework.http.ResponseEntity.noContent;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.libraries.rest.BaseRestService;
import com.template.users.UserResource;

/**
 * The type Person rest controller.
 */
@RestController
@RequestMapping(value = "/people", produces = "application/json")
public class PersonRestService extends BaseRestService {

    @Autowired
    private PersonAppService appService;

    @Autowired
    private PersonMetaFabricator metaFabricator;

    /**
     * Template response entity.
     * @return the response entity
     */
    @GetMapping("/template")
    public ResponseEntity<PersonResource> template() {

        final PersonResource resource = PersonResource.builder()
                .build();
// TODO add meta and links
//        final PersonResourceResponse response = new PersonResourceResponse(resource, metaFabricator.createMetaForTemplate());
//        response.add(buildSelfLink());

        return buildResponseOk(getJsonRootName(PersonResource.class), resource);
    }

    /**
     * Create response entity.
     * @param payload the person from request
     * @return the response entity
     */
    @PostMapping("")
    public ResponseEntity<PersonResource> create(@RequestBody @Valid final PersonResource payload) {
        final PersonResource createdResource = appService.create(payload);

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
    public ResponseEntity<PersonResource> findAll() {

        final List<PersonResource> resources = appService.findAll();

        //TODO get the resource collection and add link to the collection
//        final PersonResourceCollectionResponse<PersonResourceResponse> response = new PersonResourceCollectionResponse<>(
//                new CollectionModel(resources),
//                PersonResourceAssembler.createLinksToCollection(),
//                metaFabricator.createMetaForCollectionResource());

        return buildResponseOk(getJsonRootName(PersonResource.class), resources);
    }

    /**
     * Find by id response entity.
     * @param id the id
     * @return the response entity
     */
    @GetMapping("/{id}")
    public ResponseEntity<PersonResource> findById(@PathVariable final long id) {

        final PersonResource resource = appService.findById(id);

        // TODO add meta and links

        return buildResponseOk(getJsonRootName(UserResource.class), resource);
    }

    /**
     * Update response entity.
     * @param id the id
     * @param personFromRequest the person from request
     * @return the response entity
     */
    @PutMapping("/{id}")
    public ResponseEntity<PersonResource> update(@PathVariable("id") final long id,
            @RequestBody @Valid final PersonResource personFromRequest) {
        final PersonResource updatedResource = appService.update(id, personFromRequest);

        // TODO add meta and links

        return buildResponseOk(getJsonRootName(UserResource.class), updatedResource);
    }

    /**
     * Delete response entity.
     * @param id the id
     * @return the response entity
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") final long id) {
        appService.deleteById(id);

        return noContent().build();
    }
}
