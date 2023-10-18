package com.template.people.images;

import com.template.libraries.rest.BaseRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
@RequestMapping(value = "/hrm/people/{userId}/images")
public class PersonPhotoRestService extends BaseRestService {

    // TODO do vby person Id or user id???

    @Autowired
    private PersonPhotoAppService appService;

    @PostMapping("")
    @PreAuthorize(value = "checkOwnerByUserId(#userId)")
    public ResponseEntity<PersonPhotoResource> create(@PathVariable final Long userId, @RequestParam("file") MultipartFile file, @AuthenticationPrincipal final UserDetails userDetails) {
        final PersonPhotoResource createdResource = this.appService.create(userDetails, file);

        return buildResponseCreated(getJsonRootName(PersonPhotoResource.class), createdResource, new HashMap<>());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonPhotoResource> findById(@PathVariable final Long userId, @PathVariable final String id) {
        final PersonPhotoResource resource = appService.findById(userId, id);

        return buildResponseOk(getJsonRootName(PersonPhotoResource.class), resource, new HashMap<>());
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> download(@PathVariable final Long userId, @PathVariable final String id) {
        final PersonPhotoResource resource = appService.downloadPhoto(id);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(resource.getMimeType()))
                .body(resource.getData());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize(value = "checkOwnerByUserId(#userId)")
    public ResponseEntity deleteById(@PathVariable final Long userId, @PathVariable final String id) {
        this.appService.deleteById(userId, id);

        return ResponseEntity
                .noContent()
                .build();
    }
}
