import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

import {DateTimeService} from '../_services/date-time.service';
import {RegistrationForm} from "./registration-form";
import {UserRegistration} from "./user-registration";
import {EMAIL_PATTERN} from "../shared/constants";


@Injectable({
  providedIn: 'root'
})
export class RegistrationFormBuilder {

  public form: FormGroup<RegistrationForm>;

  constructor(
    private formBuilder: FormBuilder,
    private dateTimeService: DateTimeService) {

    this.form = this.formBuilder.group<RegistrationForm>({
        firstName: this.formBuilder.nonNullable.control('', {
          validators: [Validators.required, Validators.minLength(2)]
        }),
        lastName: this.formBuilder.nonNullable.control('', {
          validators: [Validators.required, Validators.minLength(2)]
        }),
        email: this.formBuilder.nonNullable.control('', {
          validators: [Validators.required, Validators.email]
        }),
        password: this.formBuilder.nonNullable.control('', {
          validators: [
            Validators.required,
            Validators.pattern(new RegExp(EMAIL_PATTERN))
          ]
        }),
        dateOfBirth: this.formBuilder.control(null)
      }
    );
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

  get password(): FormControl<string> {
    return this.form.controls.password;
  }

  get dateOfBirth(): FormControl<string | null> | null {
    if (this.form.controls.dateOfBirth) {
      return this.form.controls.dateOfBirth;
    }

    return null;
  }

  getFormValue(): UserRegistration {
    const dateOfBirth: string | null = _.isUndefined(this.form.controls.dateOfBirth) ? null
      : this.dateTimeService.parseDate(this.form.controls.dateOfBirth.value);

    return new UserRegistration(
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.email.value,
      this.form.controls.password.value,
      dateOfBirth
    );
  }
}
