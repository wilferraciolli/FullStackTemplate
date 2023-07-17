package com.template.users;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.template.libraries.rest.Metadata;
import com.template.libraries.rest.MetadataEmnbedded;

/**
 * The type User meta fabricator.
 */
@Service
public class UserMetaFabricator {

    public Map<String, Metadata> createMetaForTemplate() {
        return buildBasicMeta();
    }

    public Map<String, Metadata> createMetaForSingleResource() {
        return buildBasicMeta();
    }

    public Map<String, Metadata> createMetaForCreatedResource(final List<String> roleIds) {
        return buildCreatedMeta(roleIds);
    }

    public Map<String, Metadata> createMetaForCollectionResource(final Set<String> userRoleIds) {
        return buildCollectionMeta(userRoleIds);
    }

    private Map<String, Metadata> buildBasicMeta() {
        Map<String, Metadata> metadata = new HashMap<>();

        metadata.put("id", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("username", Metadata.builder()
                .mandatory(true)
                .build());

        metadata.put("password", Metadata.builder()
                .mandatory(true)
                .build());

        metadata.put("roleIds", Metadata.builder()
                .mandatory(true)
                .values(generateUserRoleEmbedded())
                .build());

        return metadata;
    }

    private Map<String, Metadata> buildCreatedMeta(final List<String> roleIds) {

        Map<String, Metadata> metadata = new HashMap<>();

        metadata.put("id", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("userName", Metadata.builder()
                .mandatory(true)
                .build());

        metadata.put("password", Metadata.builder()
                .mandatory(true)
                .build());

        metadata.put("roleIds", Metadata.builder()
                .mandatory(true)
                .values(generateFilteredUserRoleEmbedded(Set.copyOf(roleIds)))
                .build());

        return metadata;
    }

    private Map<String, Metadata> buildCollectionMeta(final Set<String> userRoleIds) {

        Map<String, Metadata> metadata = new HashMap<>();

        metadata.put("id", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("roleIds", Metadata.builder()
                .values(generateFilteredUserRoleEmbedded(userRoleIds))
                .build());

        return metadata;
    }

    private List<MetadataEmnbedded> generateUserRoleEmbedded() {
        return UserRoleType.stream()
                .map(value -> new MetadataEmnbedded(value.name(), value.getDescription()))
                .collect(Collectors.toList());
    }

    private List<MetadataEmnbedded> generateFilteredUserRoleEmbedded(final Set<String> userRoleIds) {

        return userRoleIds.stream()
                .map(userRole -> new MetadataEmnbedded(UserRoleType.valueOf(userRole).name(), UserRoleType.valueOf(userRole).getDescription()))
                .collect(Collectors.toList());
    }

}
