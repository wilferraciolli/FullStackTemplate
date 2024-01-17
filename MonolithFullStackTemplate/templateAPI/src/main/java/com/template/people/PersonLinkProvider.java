package com.template.people;

import com.template.libraries.rest.LinkBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PersonLinkProvider {

    private final LinkBuilder linkBuilder;

    public Link generateGetAllPeopleLink() {
        return linkBuilder.buildLink(
                PersonRestService.class,
                "findAll",
                "people");
    }

    public Link generateSelfLink(final Long id) {
        if (Objects.nonNull(id)) {
            return linkBuilder.buildSelfLink(
                    PersonRestService.class,
                    "findById",
                    Map.of("id", id));
        }

        return null;
    }

    public Link generateUpdateLink(final Long id) {
        if (Objects.nonNull(id)) {
            return linkBuilder.buildLink(
                    PersonRestService.class,
                    "update",
                    "updatePerson",
                    Map.of("id", id));
        }

        return null;
    }

    public Link generateDeleteLink(final Long id) {
        if (Objects.nonNull(id)) {
            return linkBuilder.buildLink(
                    PersonRestService.class,
                    "deleteById",
                    "deletePerson",
                    Map.of("id", id));
        }

        return null;
    }
}
