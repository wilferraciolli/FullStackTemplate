import {UserProfile} from "./user.profile";
import {MetaData, MetaDataRules, MetaDataWithValues} from "../../shared/response/meta-data";
import {Link} from "../../shared/response/link";

export interface UserProfileResponse {
  _data: {
    userProfile: UserProfile
  };
  _metadata: UserProfileMeta;
  _metaLinks: {
    self: Link
  };
}

export interface UserProfileMeta extends MetaData {
  personId: MetaDataWithValues;
  username: MetaDataRules;
  firstName: MetaDataRules;
  lastName: MetaDataRules;
  roleIds: MetaDataWithValues;
}
