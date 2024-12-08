import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserProfileResponse} from './classes/user.profile.response';
import {UserProfile} from './classes/user.profile';
import {UserProfileAdapter} from "./classes/user.profile-adapter";
import {GUEST_USER_PROFILE, UserSessionStore} from "./user-session-store/user-session.store";
import {StorageService} from "./storage/storage.service";
import {USER_PROFILE_KEY} from "./storage/storage-known-key.constant";

@Injectable({providedIn: 'root'})
export class ProfileService {

  private readonly _USER_PROFILE_URL: string = environment.baseUrl + '/api/iam/userprofile';
  private readonly _userStore = inject(UserSessionStore);
  private readonly _storageService: StorageService = inject(StorageService);
  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _adapter: UserProfileAdapter = inject(UserProfileAdapter);

  constructor() {
  }

  public fetchUserProfile(): void {
    this.loadUserProfile()
      .then((userProfileResponse: UserProfileResponse) => {
        this.populateUserProfile(userProfileResponse);
      });
  }

  public removeUserProfile(): void {
    this._storageService.removeItem(USER_PROFILE_KEY);
    this._userStore.updateUserProfile(GUEST_USER_PROFILE);
  }

  private async loadUserProfile<T>(): Promise<UserProfileResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('content-type', 'application/json');


    // @ts-ignore
    const data: UserProfileResponse = await this._httpClient
      .get<UserProfileResponse>(this._USER_PROFILE_URL, {headers})
      .toPromise();

    return data;
  }

  private populateUserProfile(userProfileResponse: UserProfileResponse): void {
    const userProfile: UserProfile = this._adapter.adapt(
      userProfileResponse._data.userProfile,
      userProfileResponse._data.userProfile.links,
      userProfileResponse._metadata);

    this._storageService.addToLocalStorage<UserProfile>(USER_PROFILE_KEY, userProfile)
    this._userStore.updateUserProfile(userProfile);
  }
}
