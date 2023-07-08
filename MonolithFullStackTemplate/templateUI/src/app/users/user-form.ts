import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {UserLinks} from "./user-links";
import {ValueViewValue} from "../shared/response/value-viewValue";
import {IdValueForm} from "../shared/response/id-valueForm";

export interface UserForm {
  $key: FormControl<string | null>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  username: FormControl<string>;
  password: FormControl<string>;
  dateOfBirth: FormControl<string | null>;
  active: FormControl<boolean | null>;
  roleIds: FormArray<FormGroup<IdValueForm>>;
}
