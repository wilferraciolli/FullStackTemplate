import { Link } from '../../shared/response/link';
import { PersonPhoto } from './person-photo';

export interface PersonPhotoResponse {
  _data: {
    personPhoto: PersonPhoto
  };
  _metaLinks: {
    self: Link
  };
}
