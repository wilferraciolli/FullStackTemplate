import { Link } from '../../shared/response/link';

export class UserProfileLinks {
  self: Link;
  users?: Link;
  people?: Link;
  person?: Link;
  userSettings?: Link;

  constructor(self: Link, users?: Link, people?: Link, person?: Link, userSettings?: Link) {
    this.self = self;
    this.users = users;
    this.people = people;
    this.person = person;
    this.userSettings = userSettings;
  }
}
