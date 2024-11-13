import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  public currentUserProfile!: Observable<UserProfile>;
  private currentUserProfileSubject!: BehaviorSubject<UserProfile>;

  constructor(private httpClient: HttpClient,
              private adapter: UserProfileAdapter) {
    // get the user profile from storage
    // @ts-ignore
    this.currentUserProfileSubject = new BehaviorSubject<UserProfile>(JSON.parse(localStorage.getItem('templateUI-userProfile')));
    this.currentUserProfile = this.currentUserProfileSubject.asObservable();
  }

  public get currentUserProfileValue(): UserProfile | null {
    if (this.currentUserProfileSubject) {
      return this.currentUserProfileSubject.value;
    }

    return null;
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
    const data: UserProfileResponse = await this.httpClient
      .get<UserProfileResponse>(this._USER_PROFILE_URL, {headers})
      .toPromise();

    return data;
  }

  private populateUserProfile(userProfileResponse: UserProfileResponse): void {
    const userProfile: UserProfile = this.adapter.adapt(
      userProfileResponse._data.userProfile,
      userProfileResponse._data.userProfile.links,
      userProfileResponse._metadata);
    this._storageService.addToLocalStorage<UserProfile>(USER_PROFILE_KEY, userProfile)
    this.currentUserProfileSubject.next(userProfile);

    this._userStore.updateUserProfile(userProfile);
  }
}
