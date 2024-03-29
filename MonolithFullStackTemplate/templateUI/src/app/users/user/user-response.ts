import {User} from '../user';
import {MetaDataRules, MetaDataWithValues} from '../../shared/response/meta-data';

export interface UserResponse {
  _data: {
    user: User
  };
  _metadata: {
    id: MetaDataRules;
    username: MetaDataRules;
    password: MetaDataRules;
    roleIds: MetaDataWithValues;
  };
  _metaLinks: {
    self: {
      href: string
    }
  };
}
