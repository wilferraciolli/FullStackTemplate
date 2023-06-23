import {User} from '../user';
import {MetaDataRules, MetaDataWithValues} from '../../shared/response/meta-data';

export interface UserListResponse {
  _data: {
    user: Array<User>
  };
  _metadata: {
    id: MetaDataRules,
    roleIds: MetaDataWithValues
  };
  _metaLinks: {
    self: {
      href: string
    },
    createUser: {
      href: string
    }
  };
}
