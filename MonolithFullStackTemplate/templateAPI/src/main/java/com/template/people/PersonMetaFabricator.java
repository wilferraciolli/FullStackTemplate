package com.template.people;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.template.libraries.rest.Metadata;
import com.template.libraries.rest.MetadataEmnbedded;
import com.template.users.UserRoleType;

/**
 * The type Person meta fabricator.
 */
@Service
public class PersonMetaFabricator {

    public Map<String, Metadata> createMetaForSingleResource() {
        return buildBasicMeta();
    }

    private Map<String, Metadata> buildBasicMeta() {
        Map<String, Metadata> metadata = new HashMap<>();

        metadata.put("id", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("userId", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("email", Metadata.builder()
                .readOnly(true)
                .build());

        metadata.put("genderId", Metadata.builder()
                .values(generatePersonGenderEmbedded())
                .build());

        metadata.put("maritalStatusId", Metadata.builder()
                .values(generatePersonMaritalStatusEmbedded())
                .build());

        return metadata;
    }


    /**
     * Generate person gender embedded list.
     * @return the list
     */
    private List<MetadataEmnbedded> generatePersonGenderEmbedded() {
        return PersonGenderType.stream()
                .map(value -> new MetadataEmnbedded(value.name(), value.getDescription()))
                .collect(Collectors.toList());
    }

    /**
     * Generate person marital status embedded list.
     * @return the list
     */
    private List<MetadataEmnbedded> generatePersonMaritalStatusEmbedded() {
        return PersonMaritalStatusType.stream()
                .map(value -> new MetadataEmnbedded(value.name(), value.getDescription()))
                .collect(Collectors.toList());
    }

    public Map<String, Metadata> createMetaForCollectionResource(Set<String> maritalStatusesIds, Set<String> genderIds) {
        return buildCollectionMeta(maritalStatusesIds, genderIds);
    }

    private Map<String, Metadata> buildCollectionMeta(Set<String> maritalStatusesIds, Set<String> genderIds) {
        Map<String, Metadata> metadata = new HashMap<>();

        metadata.put("id", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("userId", Metadata.builder()
                .hidden(true)
                .readOnly(true)
                .build());

        metadata.put("email", Metadata.builder()
                .readOnly(true)
                .build());

        metadata.put("genderId", Metadata.builder()
                .values(generateFilteredPersonGenderEmbedded(genderIds))
                .build());

        metadata.put("maritalStatusId", Metadata.builder()
                .values(generateFilteredPersonMaritalStatusEmbedded(maritalStatusesIds))
                .build());

        return metadata;
    }

    private List<MetadataEmnbedded> generateFilteredPersonMaritalStatusEmbedded(Set<String> maritalStatusesIds) {
        return maritalStatusesIds.stream()
                .map(statusId -> new MetadataEmnbedded(PersonMaritalStatusType.valueOf(statusId).name(),
                        PersonMaritalStatusType.valueOf(statusId).getDescription()))
                .collect(Collectors.toList());
    }

    private List<MetadataEmnbedded> generateFilteredPersonGenderEmbedded(Set<String> genderIds) {
        return genderIds.stream()
                .map(genderId -> new MetadataEmnbedded(PersonGenderType.valueOf(genderId).name(),
                        PersonGenderType.valueOf(genderId).getDescription()))
                .collect(Collectors.toList());
    }
}
