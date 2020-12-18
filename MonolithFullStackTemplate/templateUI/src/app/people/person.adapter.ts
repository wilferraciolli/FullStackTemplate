// class to implement the model adapter pattern
import { Injectable } from '@angular/core';
import { Adapter } from '../shared/response/adapter';
import { Person } from './person';
import { PersonLinks } from './person-links';

@Injectable({
  providedIn: 'root'
})
export class PersonAdapter implements Adapter<Person> {

  adapt(data: any, links: any, meta: any): Person {

    console.log('The data is ', data);
    console.log('The links are ', links);
    console.log('The meta is ', meta);

    return new Person(data.person.id,
      data.person.userId,
      data.person.firstName,
      data.person.lastName,
      data.person.email,
      data.person.dateOfBirth,
      data.person.genderId,
      data.person.maritalStatusId,
      data.person.numberOfDependants,
      data.person.phoneNumber,
      new PersonLinks(links.self,
        links.updatePerson,
        links.deletePerson,
        links.people),
      meta);
  }
}
