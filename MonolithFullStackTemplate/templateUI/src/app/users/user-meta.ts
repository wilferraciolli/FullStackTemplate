import { MetaData, MetaDataRules, MetaDataWithValues } from '../shared/response/meta-data';

export interface UserMeta extends MetaData {
  username: MetaDataRules;
  password: MetaDataRules;
  roleIds: MetaDataWithValues;
}
