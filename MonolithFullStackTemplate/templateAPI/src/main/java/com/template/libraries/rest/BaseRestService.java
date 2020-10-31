package com.template.libraries.rest;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fasterxml.jackson.annotation.JsonRootName;

/**
 * The type Base rest service.
 */
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

    /**
     * Build response ok response entity.
     * @param rootName the root name
     * @param resource the resource
     * @return the response entity
     */
    public ResponseEntity buildResponseOk(final String rootName, final BaseDTO resource) {

        final BaseResponse response = new BaseResponse();
        response.setData(rootName, resource);
        response.setMessages("Template Message");
        response.addMetaLink(buildSelfLink());

        return ResponseEntity.ok().body(response);
    }

    /**
     * Build response ok response entity.
     * @param rootName the root name
     * @param resource the resource
     * @param metadata the metadata
     * @return the response entity
     */
    public ResponseEntity buildResponseOk(final String rootName, final BaseDTO resource, final Map<String, Metadata> metadata) {

        final BaseResponse response = new BaseResponse();
        response.setData(rootName, resource);
        response.setMetadata(metadata);
        response.addMetaLink(buildSelfLink());

        return ResponseEntity.ok().body(response);
    }

    /**
     * Build response ok response entity. For a collection.
     * @param rootName the root name
     * @param resources the resources
     * @return the response entity
     */
    public ResponseEntity buildResponseOk(final String rootName, final List<? extends BaseDTO> resources) {
        final BaseResponse response = new BaseResponse();
        response.setData(rootName, resources);
        response.addMetaLink(buildSelfLink());

        return ResponseEntity.ok().body(response);
    }

    /**
     * Build response ok response entity. For a collection.
     * @param rootName the root name
     * @param resources the resources
     * @param metadata the metadata
     * @return the response entity
     */
    public ResponseEntity buildResponseOk(final String rootName, final List<? extends BaseDTO> resources, final Map<String, Metadata> metadata) {
        final BaseResponse response = new BaseResponse();
        response.setData(rootName, resources);
        response.setMetadata(metadata);
        response.addMetaLink(buildSelfLink());

        return ResponseEntity.ok().body(response);
    }

    /**
     * Gets json root name.
     * @param clazz the clazz
     * @return the json root name
     */
    public String getJsonRootName(final Class<? extends BaseDTO> clazz) {

        if (clazz.isAnnotationPresent(JsonRootName.class)) {
            return clazz.getAnnotation(JsonRootName.class).value();
        } else {
            return clazz.getSimpleName();
        }
    }
}
