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
    // @ts-ignore

    const person: Person = new Person(
      // @ts-ignore
      this.form.controls.$key.value,
      // @ts-ignore
      this.form.controls.userId.value,
      // @ts-ignore
      this.form.controls.firstName.value,
      // @ts-ignore
      this.form.controls.lastName.value,
      // @ts-ignore
      this.form.controls.email.value,
      // @ts-ignore
      this.dateTimeService.parseDate(this.form.controls.dateOfBirth.value),
      // @ts-ignore
      this.form.controls.genderId.value,
      // @ts-ignore
      this.form.controls.maritalStatusId.value,
      // @ts-ignore
      this.form.controls.numberOfDependants.value,
      // @ts-ignore
      this.form.controls.phoneNumber.value,
      // @ts-ignore
      this.form.controls.links.value,
      // @ts-ignore
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

  /**
   * Initialize the form with default values.
   */
  resetFormGroup(): void {

    this.form.setValue(
      {
        $key: null,
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        genderId: '',
        maritalStatusId: '',
        numberOfDependants: 0,
        phoneNumber: '',
        links: null,
        meta: ''
      }
    );
  }
}
