package com.template.libraries.rest;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.annotation.JsonRootName;

public class BaseRestService {

    /**
     * Build location header uri.
     * @param id the id
     * @return the uri
     */
    public URI buildLocationHeader(final Long id) {

        return MvcUriComponentsBuilder.fromController(getClass()).path("/{id}").buildAndExpand(id).toUri();
    }

    /**
     * Build self link link.
     * @return the link
     */
    public Link buildSelfLink() {
        final String uriString = ServletUriComponentsBuilder.fromCurrentRequest().build().toUriString();

        return new Link(uriString, "self");
    }

    public ResponseEntity buildResponseOk(final String rootName, final BaseDTO resource) {

        final BaseResponse response = new BaseResponse();
        response.setData(rootName, resource);
        response.addMetaData();
        response.setMessages("Message");
        response.addMetaLink(buildSelfLink());

        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity buildResponseOk(final String rootName, final List<? extends BaseDTO> resources) {
        final BaseResponse response = new BaseResponse();
        response.setData(rootName, resources);
        response.addMetaData();
        response.setMessages("Message");
        response.setMetaLinks(Map.of("self", new LinkDetails("localhost:5001")));

        return ResponseEntity.ok().body(response);
    }

    public String getJsonRootName(final Class<? extends BaseDTO> clazz) {

        if (clazz.isAnnotationPresent(JsonRootName.class)) {
            return clazz.getAnnotation(JsonRootName.class).value();
        } else {
            return clazz.getSimpleName();
        }
    }
}
