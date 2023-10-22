package com.template.people.images;


import org.apache.commons.lang3.ObjectUtils;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Service
public class PersonPhotoLinkProvider {

    public Link generateSelfLink(final Long personId, final String id) {
        if (ObjectUtils.allNotNull(personId, id)) {
            return linkTo(methodOn(PersonPhotoRestService.class)
                    .findById(personId, id))
                    .withSelfRel();
        }

        return null;
    }

    public Link createUpdateImageLink(final Long personId) {
        if (Objects.nonNull(personId)) {
            return linkTo(methodOn(PersonPhotoRestService.class)
                    .create(personId, null))
                    .withRel("createUpdatePersonPhoto");
        }

        return null;
    }

    public Link generateDownloadLink(final Long personId, final String id) {
        if (ObjectUtils.allNotNull(personId, id)) {
            return linkTo(methodOn(PersonPhotoRestService.class)
                    .download(personId, id))
                    .withRel("downloadPersonPhoto");
        }


        // TODO had to create public rest service
//        if (ObjectUtils.allNotNull(personId, id)) {
//            return linkTo(methodOn(PublicRestService.class)
//                    .download(personId, id))
//                    .withRel("downloadPersonPhoto");
//        }

        return null;
    }
}