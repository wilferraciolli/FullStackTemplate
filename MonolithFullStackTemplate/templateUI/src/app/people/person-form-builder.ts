import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {MetadataService} from '../_services/metadata.service';
import {DateTimeService} from '../_services/date-time.service';
import {PersonService} from './person.service';
import {Person} from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonFormBuilder {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              private metadataService: MetadataService,
              private dateTimeService: DateTimeService) {

    this.form = this.formBuilder.group({
      $key: [null],
      userId: [null],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [''],
      genderId: [''],
      maritalStatusId: [''],
      numberOfDependants: [0],
      phoneNumber: [''],
      links: [null],
      meta: []
    });
  }

  getFormValue(): Person {

    const person = new Person(
      this.form.controls.$key.value,
      this.form.controls.userId.value,
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.email.value,
      this.dateTimeService.parseDate(this.form.controls.dateOfBirth.value),
      this.form.controls.genderId.value,
      this.form.controls.maritalStatusId.value,
      this.form.controls.numberOfDependants.value,
      this.form.controls.phoneNumber.value,
      this.form.controls.links.value,
      this.form.controls.meta.value
    );

    return person;
  }

  initializeFormGroupWithTemplateValues(person: Person): void {
    console.log('the value of person is', person);

    if (_.isUndefined(person)) {

      return;
    }

    this.form.setValue(
      {
        $key: null,
        userId: _.isUndefined(person.userId) ? '' : person.userId,
        firstName: _.isUndefined(person.firstName) ? '' : person.firstName,
        lastName: _.isUndefined(person.lastName) ? '' : person.lastName,
        email: _.isUndefined(person.email) ? '' : person.email,
        dateOfBirth: _.isUndefined(person.dateOfBirth) ? '' : person.dateOfBirth,
        genderId: _.isUndefined(person.genderId) ? '' : person.genderId,
        maritalStatusId: _.isUndefined(person.maritalStatusId) ? '' : person.maritalStatusId,
        numberOfDependants: _.isUndefined(person.numberOfDependants) ? 0 : person.numberOfDependants,
        phoneNumber: _.isUndefined(person.phoneNumber) ? '' : person.phoneNumber,
        links: person.links,
        meta: ''
      }
    );
  }

  populateForm(person: Person): void {

    console.log('the value of person is ', person);

    this.form.patchValue(
      {
        $key: person.id,
        userId: person.userId,
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        dateOfBirth: person.dateOfBirth,
        genderId: person.genderId,
        maritalStatusId: person.maritalStatusId,
        numberOfDependants: person.numberOfDependants,
        phoneNumber: person.phoneNumber,
        links: {
          self: person.links.self,
          updatePerson: person.links.updatePerson,
          deletePerson: person.links.deletePerson,
          people: person.links.people
        },
        meta: person.meta
      }
    );

  }
}
