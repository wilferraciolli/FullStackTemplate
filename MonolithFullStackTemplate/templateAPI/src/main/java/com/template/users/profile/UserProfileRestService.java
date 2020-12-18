package com.template.users.profile;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.template.libraries.rest.BaseRestService;
import com.template.users.UserResource;

/**
 * The type User profile rest service.
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/iam/userprofile", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserProfileRestService extends BaseRestService {

    @Autowired
    private UserProfileAppService userProfileAppService;

    @Autowired
    private UserProfileMetaFabricator metaFabricator;

    /**
     * Gets user profile.
     * @param userDetails the user details
     * @return the user profile
     */
    @GetMapping("")
    public ResponseEntity<UserProfileResource> getUserProfile(@AuthenticationPrincipal final UserDetails userDetails) {

        final UserProfileResource resource = userProfileAppService.getUserProfile(userDetails);

        return buildResponseOk(getJsonRootName(UserProfileResource.class), resource, metaFabricator.createMeta());
    }
}
