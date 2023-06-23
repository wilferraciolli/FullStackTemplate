import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../../people/person';
import {DateTimeService} from '../../../_services/date-time.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileFormBuilder {

  constructor(private dateTimeService: DateTimeService) {
  }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    userId: new FormControl(null),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl({value: '', disabled: true}, Validators.email),
    dateOfBirth: new FormControl(''),
    genderId: new FormControl(''),
    maritalStatusId: new FormControl(''),
    numberOfDependants: new FormControl(''),
    phoneNumber: new FormControl(''),
    links: new FormControl(null),
    meta: new FormControl(null)
  });

  getFormValue(): Person {
    const person = new Person(
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

  populateForm(person: Person): void {

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
