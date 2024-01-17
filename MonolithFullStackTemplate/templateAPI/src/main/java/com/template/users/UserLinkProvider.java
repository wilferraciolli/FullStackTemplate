package com.template.users;

import com.template.libraries.rest.LinkBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserLinkProvider {

    private final LinkBuilder linkBuilder;

    public Link generateCreateUserLink() {
        return linkBuilder.buildLink(
                UserRestService.class,
                "template",
                "createUser");
    }

    public Link generateSelfLink(final Long id) {
        if (Objects.nonNull(id)) {
            return linkBuilder.buildSelfLink(
                    UserRestService.class,
                    "findById");
        }

        return null;
    }

    public Link generateUpdateLink(final Long id) {
        if (Objects.nonNull(id)) {
            return linkBuilder.buildLink(
                    UserRestService.class,
                    "update",
                    "updateUser");
        }

        return null;
    }

    public Link generateDeleteLink(final Long id) {
        if (Objects.nonNull(id)) {
            return linkBuilder.buildLink(
                    UserRestService.class,
                    "deleteById",
                    "deleteUser");
        }

        return null;
    }
}
