import {inject, Injectable} from '@angular/core';
import {UserProfile} from "../app/_services/classes/user.profile";
import {UserSessionStore} from "../app/_services/user-session-store/user-session.store";
import {StorageService} from "../app/_services/storage/storage.service";
import {
  AUTH_DETAILS_KEY,
  USER_LANGUAGE_KEY,
  USER_LOCALE_KEY,
  USER_PROFILE_KEY
} from "../app/_services/storage/storage-known-key.constant";
import {UserSetting} from "../app/_services/classes/user-settings-available";
import {TranslateService} from "@ngx-translate/core";
import {IAuthDetails} from "../app/_services/interfaces/IAuthDetails";
import {AuthService} from "../app/_services/auth-service";


@Injectable({
  providedIn: 'root'
})
export class UserSessionInitializerService {
  private _userSessionStore = inject(UserSessionStore);
  private _authService: AuthService = inject(AuthService);
  private _storageService: StorageService = inject(StorageService);
  private _translateService: TranslateService = inject(TranslateService);

  constructor() {
  }

  public async initUserSession(): Promise<void> {
    await this._setUserLoggedOnProfile();
    await this._setUserSettings();
  }

  public async initUserAuth(): Promise<void> {
    await this._setUserAuth();
  }

  private async _setUserLoggedOnProfile(): Promise<void> {
    const userProfileFromStorage: UserProfile | null = this._storageService.getFromLocalStorage<UserProfile>(USER_PROFILE_KEY);

    if (userProfileFromStorage) {
      this._userSessionStore.updateUserProfile(userProfileFromStorage);
    }
  }

  private async _setUserSettings(): Promise<void> {
    const userLocale: UserSetting | null = this._storageService.getFromLocalStorage<UserSetting>(USER_LOCALE_KEY);
    if (userLocale) {
      this._userSessionStore.updateUserLocale(userLocale);
    }

    const userLanguage: UserSetting | null = this._storageService.getFromLocalStorage<UserSetting>(USER_LANGUAGE_KEY);
    if (userLanguage) {
      this._userSessionStore.updateUserLanguage(userLanguage);
      this._translateService.use(userLanguage.id);
    }
  }

  private async _setUserAuth(): Promise<void> {
    if (!this._authService.isTokenExpired()) {
      const userAuth: IAuthDetails | null = this._storageService.getFromLocalStorage<IAuthDetails>(AUTH_DETAILS_KEY);

      if (userAuth) {
        this._userSessionStore.updateUserAuth(userAuth);
      }
    }
  }
}
