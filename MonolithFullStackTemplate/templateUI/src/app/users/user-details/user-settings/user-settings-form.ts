import {FormControl} from "@angular/forms";

export interface UserSettingsForm {
  userLanguage: FormControl<string>;
  userLocale: FormControl<string>;
}
