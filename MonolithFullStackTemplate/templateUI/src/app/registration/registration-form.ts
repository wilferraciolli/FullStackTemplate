import {FormControl} from "@angular/forms";

export interface RegistrationForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  dateOfBirth?: FormControl<string | null>;
}
