import {inject, Injectable, Signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpBaseService} from '../shared/response/base-service';
import {Link} from '../shared/response/link';
import {UserSetting} from './classes/user-settings-available';
import {IUserSetting} from './interfaces/IUserSetting';
import {StorageService} from "./storage/storage.service";
import {USER_LANGUAGE_KEY, USER_LOCALE_KEY} from "./storage/storage-known-key.constant";
import {UserSessionStore} from "./user-session-store/user-session.store";


// more on locales here https://www.zeitverschiebung.net/en/timezone/asia--famagusta
// more language codes here https://www.andiamo.co.uk/resources/iso-language-codes/

const LANGUAGE_CODE_SETTING: string = 'LANGUAGE';
const LOCALE_CODE_SETTING: string = 'LOCALE';
const USER_TYPE_SETTING: string = 'USER';

@Injectable({providedIn: 'root'})
export class UserSettingService extends HttpBaseService {
  private translateService: TranslateService = inject(TranslateService);
  private _storageService: StorageService = inject(StorageService);
  private _userSessionStore = inject(UserSessionStore);

  private _userSettingsLink: Link | undefined = undefined;

  get selectedUserLocale(): Signal<IUserSetting> {
    return this._userSessionStore.userLocale;
  }

  get selectedUserLanguage(): Signal<IUserSetting> {
    return this._userSessionStore.userLanguage;
  }

  public setUserLocale(userLocale: IUserSetting): void {
    this._createUpdateUserSetting(userLocale.id, LOCALE_CODE_SETTING);
    this._storageService.addToLocalStorage<UserSetting>(USER_LOCALE_KEY, userLocale);
    this._userSessionStore.updateUserLocale(userLocale);
    this._userSessionStore.updateUserLocale(userLocale);
  }

  public setUserLanguage(userLanguage: IUserSetting): void {
    this._createUpdateUserSetting(userLanguage.id, LANGUAGE_CODE_SETTING);
    this._storageService.addToLocalStorage<UserSetting>(USER_LANGUAGE_KEY, userLanguage);
    this._userSessionStore.updateUserLanguage(userLanguage);
    this.translateService.use(userLanguage.id);
    this._userSessionStore.updateUserLanguage(userLanguage)
  }

  private _createUpdateUserSetting(settingId: string, settingCode: string): void {
    this._userSettingsLink = this._userSessionStore.userProfile()?.links.userSettings;

    if (this._userSettingsLink) {
      this.postPromise(this._userSettingsLink?.href, {
        userId: this._userSessionStore.userProfile()?.id,
        settingUserType: USER_TYPE_SETTING,
        settingCode: settingCode,
        settingValue: settingId
      });
    }
  }
}
