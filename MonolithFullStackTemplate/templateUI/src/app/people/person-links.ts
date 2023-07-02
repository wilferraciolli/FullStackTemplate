import { Link } from '../shared/response/link';

export class PersonLinks {
  self: Link;
  updatePerson: Link | null;
  deletePerson: Link | null;
  people: Link | null;

  constructor(self: Link, updatePerson: Link | null, deletePerson: Link | null, people: Link | null) {
    this.self = self;
    this.updatePerson = updatePerson;
    this.deletePerson = deletePerson;
    this.people = people;
  }
}
