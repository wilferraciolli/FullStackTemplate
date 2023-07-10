import { Link } from '../../shared/response/link';

export class UserProfileLinks {
  self: Link;
  users?: Link;
  people?: Link;
  person?: Link;

  constructor(self: Link, users?: Link, people?: Link, person?: Link) {
    this.self = self;
    this.users = users;
    this.people = people;
    this.person = person;
  }
}
