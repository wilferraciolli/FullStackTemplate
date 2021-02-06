import {MetaDataRules, MetaDataWithValues} from '../../shared/response/meta-data';
import {Person} from '../person';

export interface PeopleResponse {
  _data: {
    person: Array<Person>
  };
  _metadata: {
    id: MetaDataRules,
    maritalStatusId: MetaDataWithValues,
    genderId: MetaDataWithValues
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
