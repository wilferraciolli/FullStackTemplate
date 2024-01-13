package com.template.libraries.rest;

import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.Link;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

/**
 * Utility class to build links.
 */
public class LinkBuilder {
    private Class<? extends BaseRestService> controllerClass;
    private String methodName;
    private String linkName;
    private Map<String, Object> pathParams;
    private Map<String, Object> queryParams;

    private LinkBuilder() {
        // Private constructor to force the use of the builder methods
    }

    public static LinkBuilder builder() {
        return new LinkBuilder();
    }

    public LinkBuilder withControllerClass(Class<? extends BaseRestService> controllerClass) {
        this.controllerClass = controllerClass;
        return this;
    }

    public LinkBuilder withMethodName(String methodName) {
        this.methodName = methodName;
        return this;
    }

    public LinkBuilder withLinkName(String linkName) {
        this.linkName = linkName;
        return this;
    }

    public LinkBuilder withSelfLinkName() {
        this.linkName = IanaLinkRelations.SELF.value();
        return this;
    }

    public LinkBuilder withPathParams(Map<String, Object> pathParams) {
        this.pathParams = pathParams;
        return this;
    }

    public LinkBuilder withQueryParams(Map<String, Object> queryParams) {
        this.queryParams = queryParams;
        return this;
    }

    public Link build() {
        if (Objects.isNull(this.controllerClass)
                || Objects.isNull(this.methodName)
                || Objects.isNull(this.linkName)) {
            System.out.println("Controller class or method name cannot be null");
            return null;
        }

        String path = getPathFromRestController(controllerClass, methodName);
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromUriString(path);

        if (Objects.nonNull(this.queryParams)) {
            queryParams.forEach(uriBuilder::queryParam);
        }


        return Link.of(uriBuilder.build().toString())
                .withRel(linkName)
                .expand(Objects.isNull(pathParams) ? Map.of() : pathParams);
    }


//    public Link buildLinkFromRestService(
//            Class<? extends BaseRestService> controllerClass,
//            String methodName,
//            String linkName,
//            Map<String, Object> pathParams) {
//
//        Link link = Link.of(getPathFromRestController(controllerClass, methodName))
//                .withRel(linkName)
//                .expand(Objects.isNull(pathParams) ? Map.of() : pathParams);
//
//        return link;
//    }

//    public Link buildSelfLinkFromRestService(
//            Class<? extends BaseRestService> controllerClass,
//            String methodName,
//            Map<String, Object> pathParams) {
//
//        return buildLinkFromRestService(controllerClass, methodName, IanaLinkRelations.SELF.value(), pathParams);
//    }

    private <T extends BaseRestService> String getPathFromRestController(Class<T> controllerClass, String methodName) {
        StringBuilder urlFromRestService = new StringBuilder();

        // get the Request Mapping annotation value from the REST service
        assignRequestMappingFromClassLevel(urlFromRestService, controllerClass);

        // Work out the HTTP method and get the xMapping value and append to the path
        Method[] methods = controllerClass.getMethods();
        Arrays.stream(methods)
                .filter(Objects::nonNull)
                .filter(method -> method.getName().equals(methodName))
                .forEach(method -> {
                    if (method.isAnnotationPresent(GetMapping.class)) {
                        getCrudMappingValueFromMethod(urlFromRestService, method, GetMapping.class);
                    } else if (method.isAnnotationPresent(PostMapping.class)) {
                        getCrudMappingValueFromMethod(urlFromRestService, method, PostMapping.class);
                    } else if (method.isAnnotationPresent(PutMapping.class)) {
                        getCrudMappingValueFromMethod(urlFromRestService, method, PutMapping.class);
                    } else if (method.isAnnotationPresent(DeleteMapping.class)) {
                        getCrudMappingValueFromMethod(urlFromRestService, method, DeleteMapping.class);
                    }
                });

        return urlFromRestService.toString();
    }

    private <T extends BaseRestService> void assignRequestMappingFromClassLevel(StringBuilder urlFromRestService, Class<T> controllerClass) {
        RequestMapping annotation = controllerClass.getAnnotation(RequestMapping.class);

        if (Objects.nonNull(annotation)) {
            String[] values = annotation.value();
            if (values.length > 0) {
                urlFromRestService.append(values[0]);
            }
        }
    }

    private void getCrudMappingValueFromMethod(StringBuilder urlFromRestService, Method method, Class<? extends Annotation> crudMapping) {
        Annotation annotation = method.getAnnotation(crudMapping);
        String[] values = new String[0];

        if (annotation != null) {
            if (annotation instanceof GetMapping) {
                values = ((GetMapping) annotation).value();
            } else if (annotation instanceof PutMapping) {
                values = ((PutMapping) annotation).value();
            } else if (annotation instanceof PostMapping) {
                values = ((PostMapping) annotation).value();
            } else if (annotation instanceof DeleteMapping) {
                values = ((DeleteMapping) annotation).value();
            }

            if (values.length > 0) {
                urlFromRestService.append(values[0]);
            }
        }
    }
}
