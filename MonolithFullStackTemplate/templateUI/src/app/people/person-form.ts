import {FormControl} from "@angular/forms";
import {PersonLinks} from "./person-links";

export interface PersonForm {
  $key: FormControl<string | null>;
  userId: FormControl<string | null>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  dateOfBirth: FormControl<string | null>;
  genderId: FormControl<string | null>;
  maritalStatusId: FormControl<string | null>;
  numberOfDependants: FormControl<number | null>;
  phoneNumber: FormControl<string | null>;
  links: FormControl<PersonLinks | null>;
  // meta: FormControl< | null>;
}
