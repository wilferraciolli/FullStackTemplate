import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from "./login-form";
import {Login} from "./login";


@Injectable({
  providedIn: 'root'
})
export class LoginFormBuilder {

  public form: FormGroup<LoginForm>;

  constructor(
    private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group<LoginForm>({
        username: this.formBuilder.nonNullable.control('', {
          validators: [Validators.required, Validators.minLength(2), Validators.email]
        }),
        password: this.formBuilder.nonNullable.control('', {
          validators: [Validators.required]
        })
      }
    );
  }

  get username(): FormControl<string> {
    return this.form.controls.username;
  }

  get password(): FormControl<string> {
    return this.form.controls.password;
  }

  getFormValue(): Login {
    return new Login(
      this.form.controls.username.value,
      this.form.controls.password.value,
    );
  }
}
