package com.template.users;

import org.springframework.stereotype.Service;

/**
 * The type User meta fabricator.
 */
@Service
public class UserMetaFabricator {

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
    //        meta.getValues().put("userName", MANDATORY_MAP);
    //        meta.getValues().put("password", MANDATORY_MAP);
    //        meta.getValues().put("roleIds", generateEmbeddedValues(Map.of(Meta.MANDATORY, Meta.TRUE), generateUserRoleEmbedded()));
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
    //        meta.getValues().put("roleIds", generateEmbeddedValues(Map.of(Meta.MANDATORY, Meta.TRUE), generateUserRoleEmbedded()));
    //
    //        return meta;
    //    }
    //
    //    private List<EmbeddedMetadata> generateUserRoleEmbedded() {
    //        return UserRoleType.stream()
    //                .map(value -> new EmbeddedMetadataSimple(value.name(), value.getDescription()))
    //                .collect(Collectors.toList());
    //    }

}
