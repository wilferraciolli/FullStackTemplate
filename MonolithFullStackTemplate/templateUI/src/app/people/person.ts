import { PersonLinks } from './person-links';
import { PersonMeta } from './person-meta';

export class Person {
  constructor(
    public id: string | null,
    public userId: string | null,
    public firstName: string,
    public lastName: string,
    public email: string,
    public imageId: string | null,
    public dateOfBirth: string | null,
    public genderId: string | null,
    public maritalStatusId: string | null,
    public numberOfDependants: number | null,
    public phoneNumber: string | null,
    public links: PersonLinks | null,
    public meta: PersonMeta | null) {
  }
}
