import {Person} from '../person';
import {Link} from "../../shared/response/link";
import {PersonMeta} from "../person-meta";

export interface PersonResponse {
  _data: {
    person: Person
  };
  _metadata: PersonMeta;
  _metaLinks: {
    self: Link
  };
}
