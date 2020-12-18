import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserServiceService} from '../../user-service.service';
import {Person} from '../../../people/person';

@Injectable({
  providedIn: 'root'
})
export class UserProfileFormBuilder {

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
      this.form.controls.$key.value,
      this.form.controls.userId.value,
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.email.value,
      this.form.controls.dateOfBirth.value,
      this.form.controls.genderId.value,
      this.form.controls.maritalStatusId.value,
      this.form.controls.numberOfDependants.value,
      this.form.controls.phoneNumber.value,
      this.form.controls.links.value,
      this.form.controls.meta.value
    );

    return person;
  }

  populateForm(person: Person): void {

    console.log('value to populate is ', person);

    this.form.setValue(
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
