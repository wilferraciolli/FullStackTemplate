import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../../people/person';
import {DateTimeService} from '../../../_services/date-time.service';
import {PersonForm} from "../../../people/person-form";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsProfileFormBuilder {

  public form: FormGroup<PersonForm>;

  constructor(
    private formBuilder: FormBuilder,
    private dateTimeService: DateTimeService
  ) {
    this.form = this.formBuilder.group<PersonForm>({
      $key: this.formBuilder.nonNullable.control(null),
      userId: this.formBuilder.nonNullable.control(null,),
      firstName: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      lastName: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      email: this.formBuilder.nonNullable.control({value: '', disabled: true}, {
        validators: [Validators.required, Validators.email]
      }),
      imageId: this.formBuilder.control(''),
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

  getFormValue(): Person {
    const person: Person = new Person(
      this.form.controls.$key.value,
      this.form.controls.userId.value,
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.email.value,
      this.form.controls.imageId.value,
      this.dateTimeService.parseDate(this.form.controls.dateOfBirth.value),
      this.form.controls.genderId.value,
      this.form.controls.maritalStatusId.value,
      this.form.controls.numberOfDependants.value,
      this.form.controls.phoneNumber.value,
      null,
      null
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
        phoneNumber: person.phoneNumber
      }
    );
  }
}
