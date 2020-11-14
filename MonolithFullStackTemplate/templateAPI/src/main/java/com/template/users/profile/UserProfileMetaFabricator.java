package com.template.users.profile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.template.libraries.rest.Metadata;
import com.template.libraries.rest.MetadataEmnbedded;
import com.template.users.UserRoleType;

@Service
public class UserProfileMetaFabricator {

    public Map<String, Metadata> createMeta() {

        return buildBasicMeta();
    }

    private Map<String, Metadata> buildBasicMeta() {
        Map<String, Metadata> metadata = new HashMap<>();

        metadata.put("id", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("personId", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("firstName", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("firstName", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        return metadata;
    }

}
