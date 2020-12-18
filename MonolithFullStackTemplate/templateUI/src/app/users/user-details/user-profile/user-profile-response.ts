import {Person} from '../../../people/person';
import {PersonMeta} from '../../../people/person-meta';

export interface UserProfileResponse {
  _data: {
    person: Person
  };
  _metadata: PersonMeta;
  _metaLinks: {
    self: {
      href: string
    }
  };
}
