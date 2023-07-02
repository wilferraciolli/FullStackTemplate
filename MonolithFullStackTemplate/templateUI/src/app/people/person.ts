import {PersonLinks} from './person-links';
import {PersonMeta} from './person-meta';

export class Person {
  id: string | null;
  userId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string | null;
  genderId: string | null;
  maritalStatusId: string | null;
  numberOfDependants: number | null;
  phoneNumber: string | null;
  links: PersonLinks | null;
  meta: PersonMeta | null;

  constructor(id: string | null,
              userId: string | null,
              firstName: string,
              lastName: string,
              email: string,
              dateOfBirth: string | null,
              genderId: string | null,
              maritalStatusId: string | null,
              numberOfDependants: number | null,
              phoneNumber: string | null,
              links: PersonLinks | null,
              meta: PersonMeta | null) {

    this.id = id;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.genderId = genderId;
    this.maritalStatusId = maritalStatusId;
    this.numberOfDependants = numberOfDependants;
    this.phoneNumber = phoneNumber;
    this.links = links;
    this.meta = meta;
  }
}
