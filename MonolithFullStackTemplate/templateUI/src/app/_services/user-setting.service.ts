import { inject, Injectable, signal, Signal, WritableSignal } from "@angular/core";
import { IUserSetting } from "./interfaces/IUserSetting";
import { UserSetting } from "./classes/user-settings-available";
import { TranslateService } from "@ngx-translate/core";


// more on locales here https://get.kintone.help/general/en/admin/list_systemadmin/list_localization/timezone.html
// more language codes here https://www.andiamo.co.uk/resources/iso-language-codes/


@Injectable({ providedIn: 'root' })
export class UserSettingService {
  private translateService: TranslateService = inject(TranslateService);

  private userLocale: WritableSignal<IUserSetting> = signal(this._resolveInitialLocale());
  private userLanguage: WritableSignal<IUserSetting> = signal(this._resolveInitialLanguage());

  get selectedUserLocale(): Signal<IUserSetting> {
    return this.userLocale.asReadonly();
  }

  get selectedUserLanguage(): Signal<IUserSetting> {
    return this.userLanguage.asReadonly();
  }

  public setUserLocale(userLocale: IUserSetting): void {
    localStorage.setItem('templateUI-userLocale', JSON.stringify(userLocale));
    this.userLocale.set(userLocale);
  }

  public setUserLanguage(userLanguage: IUserSetting): void {
    localStorage.setItem('templateUI-userLanguage',  JSON.stringify(userLanguage));
    this.translateService.use(userLanguage.id);
    this.userLanguage.set(userLanguage);
  }

  // get user settings from local storage or default
  private _resolveInitialLocale(): IUserSetting {
    const userLocaleStorage: string | null = localStorage.getItem('templateUI-userLocale');

    if (userLocaleStorage) {
      const userLocale: IUserSetting | null | undefined = JSON.parse(userLocaleStorage);

      if (userLocale) {
        return userLocale;
      }
    }

    return UserSetting.englishLocal;
  }

  // get user settings from local storage or default
  private _resolveInitialLanguage(): IUserSetting {
    const userLanguageStorage: string | null = localStorage.getItem('templateUI-userLanguage');

    if (userLanguageStorage) {
      const userLanguage: IUserSetting | null | undefined = JSON.parse(userLanguageStorage);

      if(userLanguage) {
        return userLanguage;
      }
    }

    return UserSetting.englishLanguage;
  }
}
