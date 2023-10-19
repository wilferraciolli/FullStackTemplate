package com.template.people.images;

import com.template.libraries.rest.BaseRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/hrm/people/{personId}/images")
public class PersonPhotoRestService extends BaseRestService {

    @Autowired
    private PersonPhotoAppService appService;

    @PostMapping("")
    @PreAuthorize(value = "hasRole('ROLE_ADMIN') or @personPermissionAccess.checkOwnerByPersonId(#personId)")
    public ResponseEntity<PersonPhotoResource> create(@PathVariable final Long personId, @RequestParam("file") MultipartFile file) {
        final PersonPhotoResource createdResource = this.appService.create(personId, file);

        return buildResponseCreated(getJsonRootName(PersonPhotoResource.class), createdResource, new HashMap<>());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonPhotoResource> findById(@PathVariable final Long personId, @PathVariable final String id) {
        final PersonPhotoResource resource = appService.findById(personId, id);

        return buildResponseOk(getJsonRootName(PersonPhotoResource.class), resource, new HashMap<>());
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> download(@PathVariable final Long personId, @PathVariable final String id) {
        final PersonPhotoResource resource = appService.downloadPhoto(id);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(resource.getMimeType()))
                .body(resource.getData());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(value = "@personPermissionAccess.checkOwnerByPersonId(#personId)")
    public ResponseEntity deleteById(@PathVariable final Long personId, @PathVariable final String id) {
        this.appService.deleteById(personId, id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
