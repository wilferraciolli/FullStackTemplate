package com.template.libraries.rest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.hateoas.Link;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public abstract class BaseDTO implements Transferable {

    @JsonProperty("_links")
    private final Map<String, LinkDetails> links = new HashMap<>();
    //
    //    @JsonProperty("_links2")
    //    private final Map<String, Link> links2 = new HashMap<>();

    public void addLinks(final Map<String, String> linksToAdd) {
        linksToAdd.entrySet()
                .forEach(l -> links.put(l.getKey(), new LinkDetails(l.getValue())));
    }

    public void addLink(final Link createLink) {
        links.put(createLink.getRel().value(), new LinkDetails(createLink.getHref()));
    }

    public Map<String, LinkDetails> getLinks() {
        return links;
    }
}
