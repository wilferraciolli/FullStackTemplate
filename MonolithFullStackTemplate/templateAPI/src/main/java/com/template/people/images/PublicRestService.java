package com.template.people.images;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/public/people/{personId}/images")
public class PublicRestService {

    @Autowired
    private PersonPhotoAppService appService;

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> download(@PathVariable final Long personId, @PathVariable final String id) {
        final PersonPhotoResource resource = appService.downloadPhoto(id);

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(resource.getMimeType()))
                .body(resource.getData());
    }
}
