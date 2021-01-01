package com.template.people;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.Objects;

import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import com.template.users.UserRestService;

@Service
public class PersonLinkProvider {

    public Link generateGetAllPeopleLink() {

        return linkTo(methodOn(PersonRestService.class).findAll()).withRel("people");
    }

    public Link generateSelfLink(final Long id) {
        if (Objects.nonNull(id)){

            return linkTo(methodOn(PersonRestService.class).findById(id)).withSelfRel();
        }

        return null;
    }

    public Link generateUpdateLink(final Long id) {

        if (Objects.nonNull(id)){

            return linkTo(methodOn(PersonRestService.class).findById(id)).withRel("updatePerson");
        }

        return null;
    }

    public Link generateDeleteLink(final Long id) {

        if (Objects.nonNull(id)){

            return linkTo(methodOn(PersonRestService.class).deleteById(id)).withRel("deletePerson");
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
