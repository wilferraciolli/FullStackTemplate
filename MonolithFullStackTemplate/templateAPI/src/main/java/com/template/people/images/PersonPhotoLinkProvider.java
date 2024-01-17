package com.template.people.images;


import com.template.libraries.rest.LinkBuilder;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PersonPhotoLinkProvider {

    private final LinkBuilder linkBuilder;

    public Link generateSelfLink(final Long personId, final String id) {
        if (ObjectUtils.allNotNull(personId, id)) {
            return linkBuilder.buildSelfLink(
                    PersonPhotoRestService.class,
                    "findById",
                    Map.of("personId", personId, "id", id));
        }

        return null;
    }

    public Link createUpdateImageLink(final Long personId) {
        if (Objects.nonNull(personId)) {
            return linkBuilder.buildLink(
                    PersonPhotoRestService.class,
                    "create",
                    "createUpdatePersonPhoto",
                    Map.of("personId", personId));
        }

        return null;
    }

    public Link generateDownloadLink(final Long personId, final String id) {
        if (ObjectUtils.allNotNull(personId, id)) {
            return linkBuilder.buildLink(
                    PersonPhotoRestService.class,
                    "download",
                    "downloadPersonPhoto",
                    Map.of("personId", personId, "id", id));
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
