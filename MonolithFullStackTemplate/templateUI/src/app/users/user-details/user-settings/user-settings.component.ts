import { Component, effect, OnInit } from '@angular/core';
import { UserSetting } from '../../../_services/classes/user-settings-available';
import { UserSettingService } from '../../../_services/user-setting.service';
import { ValueViewValue } from '../../../shared/response/value-viewValue';
import { UserSettings } from './user-settings';
import { UserSettingsFormBuilder } from './user-settings-form-builder';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public availableLocales: Array<ValueViewValue> = [];
  public availableLanguages: Array<ValueViewValue> = [];

  constructor(public formBuilder: UserSettingsFormBuilder,
              private _userSettingService: UserSettingService) {

    // make sure that changing the users language will update the form
    effect(() => {
      this.formBuilder.patchLanguageValue(this._userSettingService.selectedUserLanguage().id);
    });
  }

  ngOnInit(): void {
    this.formBuilder.setFormValue(
      this._userSettingService.selectedUserLanguage().id,
      this._userSettingService.selectedUserLocale().id);

    // TODO change this to get value from API and translate
    UserSetting.allAvailableLanguages.forEach((language: UserSetting) => {
      this.availableLanguages.push(new ValueViewValue(language.id, `language.${language.id}`));
    });

    UserSetting.allAvailableLocales.forEach((locale: UserSetting) => {
      this.availableLocales.push(new ValueViewValue(locale.id, `locale.${locale.id}`));
    });
  }

  public changeUserSetting(): void {
    const formValue: UserSettings = this.formBuilder.getFormValue();

    const selectedUserLanguage: UserSetting | null = this._resolveSelectedLanguage(formValue.userLanguage);
    const selectedUserLocale: UserSetting | null = this._resolveSelectedLocale(formValue.userLocale);

    if (selectedUserLanguage) {
      this._userSettingService.setUserLanguage(selectedUserLanguage);
    }
    if (selectedUserLocale) {
      this._userSettingService.setUserLocale(selectedUserLocale);
    }
  }

  private _resolveSelectedLanguage(selectedLanguageId: string): UserSetting | null {
    // return null if same choice
    if (this._userSettingService.selectedUserLanguage().id === selectedLanguageId) {
      return null;
    }

    const chosenLanguage: ValueViewValue | undefined = this.availableLanguages.find((value: ValueViewValue) =>
      value.value === selectedLanguageId);

    return chosenLanguage ? {
                            id: chosenLanguage.value,
                            name: chosenLanguage.viewValue
                          } as UserSetting
                          : null;
  }

  private _resolveSelectedLocale(selectedLocaleId: string): UserSetting | null {
    // return null if same choice
    if (this._userSettingService.selectedUserLocale().id === selectedLocaleId) {
      return null;
    }

    const chosenLocale: ValueViewValue | undefined = this.availableLocales.find((value: ValueViewValue) =>
      value.value === selectedLocaleId);

    return chosenLocale ? {
                          id: chosenLocale.value,
                          name: chosenLocale.viewValue
                        } as UserSetting
                        : null;
  }
}
