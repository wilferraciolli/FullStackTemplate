package com.template.usersettings;

import com.template.libraries.rest.BaseRestService;
import com.template.libraries.rest.Metadata;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController()
@RequestMapping(value = "/iam/users/{userId}/usersettings", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class UserSettingRestService extends BaseRestService {

    private final UserSettingAppService appService;
    private final UserSettingMetaFabricator metaFabricator;

    @PostMapping("")
    @PreAuthorize(value = "checkOwnerByUserId(#userId)")
    public ResponseEntity<UserSettingResource> createOrUpdate(@PathVariable Long userId, @RequestBody @Valid final UserSettingResource payload) {
        final UserSettingResource createdResource = this.appService.createOrUpdate(userId, payload);

        Map<String, Metadata> metadata = metaFabricator.createMetaForCollectionResource();

        return buildResponseCreated(
                getJsonRootName(UserSettingResource.class),
                createdResource,
                metadata,
               null
        );
    }

    @GetMapping("")
    @PreAuthorize(value = "checkOwnerByUserId(#userId)")
    public ResponseEntity<UserSettingResource> getAllSettingsForUser(@PathVariable Long userId) {
        final List<UserSettingResource> resources = appService.getAllSettingsForUser(userId);
        Map<String, Metadata> metadata = metaFabricator.createMetaForCollectionResource();

        return buildResponseOk(getJsonRootName(UserSettingResource.class), resources, metadata);
    }
}
