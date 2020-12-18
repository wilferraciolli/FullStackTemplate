package com.template.people;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.template.libraries.rest.Metadata;
import com.template.libraries.rest.MetadataEmnbedded;

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

    //        private Meta buildBasicMeta() {
//            final Meta meta = new Meta();
//            meta.getValues().put("id", HIDDEN_AND_READ_ONLY_MAP);
//            meta.getValues().put("firstName", MANDATORY_MAP);
//            meta.getValues().put("lastName", MANDATORY_MAP);
//            meta.getValues().put("genderId", generateEmbeddedValues(Map.of(Meta.MANDATORY, Meta.TRUE), generatePersonGenderEmbedded()));
//            meta.getValues().put("maritalStatusId", generateEmbeddedValues(Map.of(Meta.MANDATORY, Meta.TRUE), generatePersonMaritalStatusEmbedded()));
//
//            return meta;
//        }
//    //
    //    /**
    //     * Build collection meta meta.
    //     * @return the meta
    //     */
    //    private Meta buildCollectionMeta() {
    //
    //        final Meta meta = new Meta();
    //        meta.getValues().put("id", HIDDEN_AND_READ_ONLY_MAP);
    //        meta.getValues().put("genderId", generateEmbeddedValues(generatePersonGenderEmbedded()));
    //        meta.getValues().put("maritalStatusId", generateEmbeddedValues(generatePersonMaritalStatusEmbedded()));
    //
    //        return meta;
    //    }
    //
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

}
