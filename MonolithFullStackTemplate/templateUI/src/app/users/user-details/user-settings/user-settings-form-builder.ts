import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSettingsForm } from './user-settings-form';
import { UserSettings } from './user-settings';


@Injectable({
  providedIn: 'root'
})
export class UserSettingsFormBuilder {

  public form: FormGroup<UserSettingsForm>;

  constructor(
    private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group<UserSettingsForm>({
        userLanguage: this.formBuilder.nonNullable.control('', {
          validators: [Validators.required]
        }),
        userLocale: this.formBuilder.nonNullable.control('', {
          validators: [Validators.required]
        })
      }
    );
  }

  get userLanguage(): FormControl<string> {
    return this.form.controls.userLanguage;
  }

  get userLocale(): FormControl<string> {
    return this.form.controls.userLocale;
  }

  public setFormValue(userLanguage: string, userLocale: string): void {
    this.form.setValue(
      {
        userLanguage,
        userLocale
      }
    );
  }

  public getFormValue(): UserSettings {
    return new UserSettings(
      this.form.controls.userLanguage.value,
      this.form.controls.userLocale.value
    );
  }
}
