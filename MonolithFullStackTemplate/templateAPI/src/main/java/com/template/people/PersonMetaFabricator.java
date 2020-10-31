package com.template.people;

import org.springframework.stereotype.Service;

/**
 * The type Person meta fabricator.
 */
@Service
public class PersonMetaFabricator {

    //    @Override
    //    public Meta createMetaForTemplate() {
    //        return buildBasicMeta();
    //    }
    //
    //    @Override
    //    public Meta createMetaForSingleResource() {
    //        return buildBasicMeta();
    //    }
    //
    //    @Override
    //    public Meta createMetaForCollectionResource() {
    //        return buildCollectionMeta();
    //    }
    //
    //    private Meta buildBasicMeta() {
    //        final Meta meta = new Meta();
    //        meta.getValues().put("id", HIDDEN_AND_READ_ONLY_MAP);
    //        meta.getValues().put("firstName", MANDATORY_MAP);
    //        meta.getValues().put("lastName", MANDATORY_MAP);
    //        meta.getValues().put("genderId", generateEmbeddedValues(Map.of(Meta.MANDATORY, Meta.TRUE), generatePersonGenderEmbedded()));
    //        meta.getValues().put("maritalStatusId", generateEmbeddedValues(Map.of(Meta.MANDATORY, Meta.TRUE), generatePersonMaritalStatusEmbedded()));
    //
    //        return meta;
    //    }
    //
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
    //    /**
    //     * Generate person gender embedded list.
    //     * @return the list
    //     */
    //    private List<EmbeddedMetadata> generatePersonGenderEmbedded() {
    //        return PersonGenderType.stream()
    //                .map(value -> new EmbeddedMetadataSimple(value.name(), value.getDescription()))
    //                .collect(Collectors.toList());
    //    }
    //
    //    /**
    //     * Generate person marital status embedded list.
    //     * @return the list
    //     */
    //    private List<EmbeddedMetadata> generatePersonMaritalStatusEmbedded() {
    //        return PersonMaritalStatusType.stream()
    //                .map(value -> new EmbeddedMetadataSimple(value.name(), value.getDescription()))
    //                .collect(Collectors.toList());
    //    }

}
