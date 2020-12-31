import {MetaDataRules, MetaDataWithValues} from '../../shared/response/meta-data';
import {Person} from '../person';

export interface PersonResponse {
  _data: {
    person: Person
  };
  _metadata: {
    id: MetaDataRules,
    roleIds: MetaDataWithValues
  };
  _metaLinks: {
    self: {
      href: string
    }
  };
}
