import {inject, Injectable} from '@angular/core';
import {UserProfile} from "../app/_services/classes/user.profile";
import {UserSessionStore} from "../app/_services/user-session-store/user-session.store";
import {StorageService} from "../app/_services/storage/storage.service";
import {USER_PROFILE_KEY} from "../app/_services/storage/storage-known-key.constant";


@Injectable({
  providedIn: 'root'
})
export class UserSessionInitializerService {
  private _userSessionStore = inject(UserSessionStore);
  private _storageService: StorageService = inject(StorageService);

  constructor() {
  }

  public async initUserSession(): Promise<void> {
    await this._setUserLoggedOnProfile();
  }

  private async _setUserLoggedOnProfile(): Promise<void> {
    const userProfileFromStorage: UserProfile | null = this._storageService.getFromLocalStorage<UserProfile>(USER_PROFILE_KEY);

    if (userProfileFromStorage) {
      this._userSessionStore.updateUserProfile(userProfileFromStorage);
    }
  }
}
