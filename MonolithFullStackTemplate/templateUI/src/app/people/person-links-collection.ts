import {Link} from '../shared/response/link';

export class PersonLinksCollection {
  self: Link;
  createPerson?: Link;

  constructor(self: Link, createPerson: Link) {
    this.self = self;
    this.createPerson = createPerson;
  }
}
