package com.template.users;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.hateoas.Link;

@Service
public class UserLinkProvider {

    public Link generateCreateUserLink() {

        return linkTo(methodOn(UserRestService.class).template()).withRel("createUser");
    }

    public Link generateSelfLink(final Long id) {
        if (Objects.nonNull(id)){

            return linkTo(methodOn(UserRestService.class).findById(id)).withSelfRel();
        }

        return null;
    }

    public Link generateUpdateLink(final Long id) {

        if (Objects.nonNull(id)){

            return linkTo(methodOn(UserRestService.class).findById(id)).withRel("updateUser");
        }

        return null;
    }

    public Link generateDeleteLink(final Long id) {

        if (Objects.nonNull(id)){

            return linkTo(methodOn(UserRestService.class).deleteById(id)).withRel("deleteUser");
        }

        return null;
    }

    //    public static List<Link> createLinksToCollection(final Long personId) {
    //        //add self link to the list
    //        final Link selfRel = linkTo(methodOn(PersonToDoRestService.class)
    //                .findAll(personId)).withSelfRel();
    //
    //        //add create/template link to the list
    //        final Link createLink = linkTo(methodOn(PersonToDoRestService.class)
    //                .template(personId)).withRel("createTodo");
    //
    //        return Arrays.asList(selfRel, createLink);
    //    }
}
