package com.template.libraries.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.hateoas.Link;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public abstract class BaseDTO implements Transferable {

//    private Long id;

    @JsonProperty("links")
    private final Map<String, LinkDetails> links = new HashMap<>();
    //
    //    @JsonProperty("_links2")
    //    private final Map<String, Link> links2 = new HashMap<>();

//    public void addLinks(final Map<String, String> linksToAdd) {
//        linksToAdd.entrySet()
//                .forEach(l -> links.put(l.getKey(), new LinkDetails(l.getValue())));
//    }

    /**
     * Add a single link to the resource links.
     * @param link The link to add
     */
    public void addLink(final Link link) {
        links.put(link.getRel().value(), new LinkDetails(link.getHref()));
    }

    /**
     * Adds a collection of links to the resource links.
     * @param linksToAdd The links to add
     */
    public void addLinks(final List<Link> linksToAdd) {

        linksToAdd.stream()
                .forEach(this::addLink);
    }

//    public Long getId() {
//        return id;
//    }

    public Map<String, LinkDetails> getLinks() {
        return links;
    }
}
