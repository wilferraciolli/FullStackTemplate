package com.template.libraries.rest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonRootName;

public class BaseRestService {

    public ResponseEntity buildResponseOk(final String rootName, final BaseDTO resource) {

        final BaseResponse response = new BaseResponse();
        response.setData(rootName, resource);
        response.addMetaData();
        response.setMessage("Message");
        response.setLinks(Map.of("self", new LinkDetails("localhost:5001")));

        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity buildResponseOk(final String rootName, final List<BaseDTO> resources) {
        final BaseResponse response = new BaseResponse();
        response.setData(rootName, resources);
        response.addMetaData();
        response.setMessage("Message");
        response.setLinks(Map.of("self", new LinkDetails("localhost:5001")));

        return ResponseEntity.ok().body(response);
    }

    public String getJsonRootName(final Class<? extends BaseDTO> clazz) {

        if (clazz.isAnnotationPresent(JsonRootName.class)) {
            return clazz.getAnnotation(JsonRootName.class).value();
        } else {
            return clazz.getSimpleName();
        }
    }

    //TODO not working
    public String getJsonRootName(final BaseDTO object) {

        return Optional.ofNullable(object.getClass().getAnnotation(JsonRootName.class))
                .map(annotation -> annotation.value())
                .orElse(object.getClass().getSimpleName());
    }

}
