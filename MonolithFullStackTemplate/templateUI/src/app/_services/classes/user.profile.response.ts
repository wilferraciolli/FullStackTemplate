import {UserProfile} from "./user.profile";
import {MetaData, MetaDataRules, MetaDataWithValues} from "../../shared/response/meta-data";
import {MetaLink} from "../../shared/response/meta-link";

export interface UserProfileResponse {
  _data: {
    userProfile: UserProfile
  };
  _metadata: UserProfileMeta;
  _metaLinks: MetaLink;
}

export interface UserProfileMeta extends MetaData {
  personId: MetaDataWithValues;
  username: MetaDataRules;
  firstName: MetaDataRules;
  lastName: MetaDataRules;
  roleIds: MetaDataWithValues;
}
