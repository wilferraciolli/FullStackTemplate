package com.template;

import com.template.libraries.rest.LinkBuilder;
import com.template.people.images.PersonPhotoRestService;
import com.template.users.UserRestService;
import com.template.users.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Map;

//@SpringBootTest
class SpringTemplateApplicationTests {

    @Test
    void contextLoads() {
        System.out.println(LinkBuilder.builder()
                .withControllerClass(UserRestService.class)
                .withMethodName("getAllUsers")
                .withLinkName("users")
                .build());

        System.out.println(LinkBuilder.builder()
                .withControllerClass(UserRestService.class)
                .withMethodName("findById")
                .withSelfLinkName()
                .withPathParams(Map.of("id", 1L))
                .withQueryParams(Map.of("q", 1L))
                .build());
    }

}
