import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from './person';
import { PersonForm } from './person-form';

@Injectable({
  providedIn: 'root'
})
export class PersonFormBuilder {

  public form: FormGroup<PersonForm>;

  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group<PersonForm>({
      $key: this.formBuilder.nonNullable.control(null),
      userId: this.formBuilder.nonNullable.control(null, {
        validators: [Validators.required]
      }),
      firstName: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      lastName: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      email: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.email]
      }),
      imageId: this.formBuilder.nonNullable.control(''),
      dateOfBirth: this.formBuilder.control(null),
      genderId: this.formBuilder.control(null),
      maritalStatusId: this.formBuilder.control(null),
      numberOfDependants: this.formBuilder.control(null),
      phoneNumber: this.formBuilder.nonNullable.control('')
    });
  }

  get firstName(): FormControl<string> {
    return this.form.controls.firstName;
  }

  get lastName(): FormControl<string> {
    return this.form.controls.lastName;
  }

  get email(): FormControl<string> {
    return this.form.controls.email;
  }

  public getFormValue(): Person {
    const person: Person = new Person(
      this.form.controls.$key.value,
      this.form.controls.userId.value,
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.email.value,
      this.form.controls.imageId.value,
      this.form.controls.dateOfBirth.value,
      this.form.controls.genderId.value,
      this.form.controls.maritalStatusId.value,
      this.form.controls.numberOfDependants.value,
      this.form.controls.phoneNumber.value,
      null,
      null
    );

    return person;
  }

  public populateForm(person: Person): void {
    this.form.patchValue(
      {
        $key: person.id,
        userId: person.userId,
        firstName: person.firstName,
        lastName: person.lastName,
        email: person.email,
        imageId: person.imageId,
        dateOfBirth: person.dateOfBirth,
        genderId: person.genderId,
        maritalStatusId: person.maritalStatusId,
        numberOfDependants: person.numberOfDependants,
        phoneNumber: person.phoneNumber
      }
    );
  }

  /**
   * Initialize the form with default values.
   */
  public resetFormGroup(): void {
    this.form.setValue(
      {
        $key: null,
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        imageId: '',
        dateOfBirth: '',
        genderId: '',
        maritalStatusId: '',
        numberOfDependants: 0,
        phoneNumber: ''
      }
    );
  }
}
