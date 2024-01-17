package com.template;

import com.template.libraries.rest.LinkBuilderDeprecated;
import com.template.users.UserRestService;
import org.junit.jupiter.api.Test;

import java.util.Map;

//@SpringBootTest
class SpringTemplateApplicationTests {

    @Test
    void contextLoads() {
        System.out.println(LinkBuilderDeprecated.builder()
                .withControllerClass(UserRestService.class)
                .withMethodName("getAllUsers")
                .withLinkName("users")
                .build());

        System.out.println(LinkBuilderDeprecated.builder()
                .withControllerClass(UserRestService.class)
                .withMethodName("findById")
                .withSelfLinkName()
                .withPathParams(Map.of("id", 1L))
                .withQueryParams(Map.of("q", 1L))
                .build());
    }

}
