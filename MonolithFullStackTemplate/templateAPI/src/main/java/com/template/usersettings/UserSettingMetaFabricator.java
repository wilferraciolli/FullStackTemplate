package com.template.usersettings;

import com.template.libraries.rest.Metadata;
import com.template.libraries.rest.MetadataEmnbedded;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserSettingMetaFabricator {

    public Map<String, Metadata> createMetaForCollectionResource() {
        Map<String, Metadata> metadata = new HashMap<>();

        metadata.put("id", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("userId", Metadata.builder()
                .mandatory(true)
                .readOnly(true)
                .build());

        metadata.put("settingUserType", Metadata.builder()
                .mandatory(true)
                .values(generateUserTypeEmbedded())
                .build());

        metadata.put("settingCode", Metadata.builder()
                .mandatory(true)
                .values(generateSettingCodeEmbedded())
                .build());

        metadata.put("settingValue", Metadata.builder()
                .mandatory(true)
                .build());


        return metadata;
    }

    private List<MetadataEmnbedded> generateUserTypeEmbedded() {
        return SettingUserType.stream()
                .map(value -> new MetadataEmnbedded(value.name(), value.getDescription()))
                .toList();
    }

    private List<MetadataEmnbedded> generateSettingCodeEmbedded() {
        return SettingCode.stream()
                .map(value -> new MetadataEmnbedded(value.name(), value.getDescription()))
                .toList();
    }

}
