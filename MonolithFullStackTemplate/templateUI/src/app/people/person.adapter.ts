// class to implement the model adapter pattern
import {Injectable} from '@angular/core';
import {Adapter} from '../shared/response/adapter';
import {Person} from './person';
import {PersonLinks} from './person-links';

@Injectable({
  providedIn: 'root'
})
export class PersonAdapter implements Adapter<Person> {

  adapt(person: Person, links: PersonLinks | null, meta?: any): Person {
    return new Person(person.id,
      person.userId,
      person.firstName,
      person.lastName,
      person.email,
      person.dateOfBirth,
      person.genderId,
      person.maritalStatusId,
      person.numberOfDependants,
      person.phoneNumber,
      links,
      meta);
  }
}
