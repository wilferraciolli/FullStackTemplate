import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserProfile } from './classes/user.profile';
import { UserProfileResponse } from './classes/user.profile.response';
import { UserProfileAdapter } from "./classes/user.profile-adapter";


@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  private _httpService: HttpClient = inject(HttpClient);
  private _userProfileAdapter: UserProfileAdapter = inject(UserProfileAdapter);

  private readonly _USER_PROFILE_URL: string = environment.baseUrl + '/api/iam/userprofile';

  private _userProfile: WritableSignal<UserProfile | undefined> = signal(undefined);

  constructor() {
  }

  get userProfile(): Signal<UserProfile | undefined> {
    return this._userProfile.asReadonly();
  }

  public async initUserSession(): Promise<void> {
    await this._setUserLoggedOnProfile();
  }

  public removeUserProfile(): void {
    this._userProfile.set(undefined);
  }

  private async _setUserLoggedOnProfile(): Promise<void> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('content-type', 'application/json');

    const userProfile$: Observable<UserProfile> = this._httpService.get<UserProfileResponse>(this._USER_PROFILE_URL).pipe(
      map((response: UserProfileResponse) => {
        return this._userProfileAdapter.adapt(
          response._data.userProfile,
          response._data.userProfile.links,
          response._metadata);
      })
    );

    const userProfile: UserProfile = await firstValueFrom(userProfile$);

    this._userProfile.set(userProfile);
  }
}
