import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { map, tap } from 'rxjs/operators';
import { HttpBaseService } from '../shared/response/base-service';
import { Link } from '../shared/response/link';
import { UserSetting } from './classes/user-settings-available';
import { UserProfile } from './classes/user.profile';
import { IUserSetting } from './interfaces/IUserSetting';
import { UserSettingsResponse } from './interfaces/user-settings-response';
import { ProfileService } from './profile.service';


// more on locales here https://www.zeitverschiebung.net/en/timezone/asia--famagusta
// more language codes here https://www.andiamo.co.uk/resources/iso-language-codes/

const LANGUAGE_CODE_SETTING: string = 'LANGUAGE';
const LOCALE_CODE_SETTING: string = 'LOCALE';
const USER_TYPE_SETTING: string = 'USER';

@Injectable({ providedIn: 'root' })
export class UserSettingService extends HttpBaseService {
  private translateService: TranslateService = inject(TranslateService);
  private profileService: ProfileService = inject(ProfileService);

  private userLocale: WritableSignal<IUserSetting> = signal(UserSetting.englishLocale);
  private userLanguage: WritableSignal<IUserSetting> = signal(UserSetting.englishLanguage);

  private _userProfile: UserProfile | null = null;
  private _userSettingsLink: Link | undefined = undefined;

  get selectedUserLocale(): Signal<IUserSetting> {
    return this.userLocale.asReadonly();
  }

  get selectedUserLanguage(): Signal<IUserSetting> {
    return this.userLanguage.asReadonly();
  }

  public setUserLocale(userLocale: IUserSetting): void {
    this._createUpdateUserSetting(userLocale.id, LOCALE_CODE_SETTING);
    // localStorage.setItem('templateUI-userLocale', JSON.stringify(userLocale));
    this.userLocale.set(userLocale);
  }

  public setUserLanguage(userLanguage: IUserSetting): void {
    this._createUpdateUserSetting(userLanguage.id, LANGUAGE_CODE_SETTING);
    // localStorage.setItem('templateUI-userLanguage', JSON.stringify(userLanguage));
    this.translateService.use(userLanguage.id);
    this.userLanguage.set(userLanguage);
  }

  // get user settings from local storage or default
  // private _resolveInitialLocale(): IUserSetting {
  //   const userLocaleStorage: string | null = localStorage.getItem('templateUI-userLocale');
  //
  //   if (userLocaleStorage) {
  //     const userLocale: IUserSetting | null | undefined = JSON.parse(userLocaleStorage);
  //
  //     if (userLocale) {
  //       return userLocale;
  //     }
  //   }
  //
  //   return UserSetting.englishLocal;
  // }

  // private _resolveInitialLanguage(): IUserSetting {
  //   const userLanguageStorage: string | null = localStorage.getItem('templateUI-userLanguage');
  //   if (userLanguageStorage) {
  //     const userLanguage: IUserSetting | null | undefined = JSON.parse(userLanguageStorage);
  //
  //     if (userLanguage) {
  //       return userLanguage;
  //     }
  //   }
  //
  //   return UserSetting.englishLanguage;
  // }

  public fetchInitialUserSettings(): void {
    this._userProfile = this.profileService.currentUserProfileValue;
    this._userSettingsLink = this._userProfile?.links.userSettings;

    if (this._userSettingsLink) {
      this.getSingle<UserSettingsResponse>(this._userSettingsLink.href).subscribe((response: UserSettingsResponse) => {
        if (response) {
          response._data.userSetting.forEach(v => {
            console.log('found value ', v);
            if (LANGUAGE_CODE_SETTING === v.settingCode) {
              this.userLanguage.set({ id: v.settingValue, name: v.settingValue });
            }

            if (LOCALE_CODE_SETTING === v.settingCode) {
              this.userLocale.set({ id: v.settingValue, name: v.settingValue });
            }
          });
        }
      });
    }
  }

  // public fetchInitialLanguage(): void {
  //   this._userProfile = this.profileService.currentUserProfileValue;
  //   this._userSettingsLink = this._userProfile?.links.userSettings;
  //
  //   if (this._userSettingsLink) {
  //     this.getSingle<UserSettingsResponse>(this._userSettingsLink.href).pipe(
  //       map((v: UserSettingsResponse) =>
  //         v._data.userSetting.find(id => LANGUAGE_CODE_SETTING === id.settingCode)
  //       )
  //     ).subscribe(language=> {
  //       if (language){
  //         this.userLanguage.set({id: language.settingValue, name: language.settingValue});
  //       }
  //     });
  //   }
  // }

  private _createUpdateUserSetting(settingId: string, settingCode: string): void {
    this._userProfile = this.profileService.currentUserProfileValue;
    this._userSettingsLink = this._userProfile?.links.userSettings;

    if (this._userSettingsLink) {
      this.postPromise(this._userSettingsLink?.href, {
        userId: this._userProfile?.id,
        settingUserType: USER_TYPE_SETTING,
        settingCode: settingCode,
        settingValue: settingId
      });
    }
  }
}
