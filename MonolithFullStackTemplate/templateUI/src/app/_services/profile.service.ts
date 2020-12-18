import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {UserProfileResponse} from '../users/profile/user.profile.response';
import {UserProfile} from '../users/profile/user.profile';
import {UserRegistration} from '../registration/user-registration';

import * as _ from 'lodash';
import * as jwt_decode from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class ProfileService {

  private readonly _USER_PROFILE_URL = environment.baseUrl + '/api/iam/userprofile';

  public currentUserProfile: Observable<UserProfile>;
  private currentUserProfileSubject: BehaviorSubject<UserProfile>;

  /**
   * Constructor.
   */
  constructor(private httpClient: HttpClient) {
    // get the user profile from storage
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
    console.log('Adding userProfile in Profile Service');

    this.loadUserProfile()
      .then((userProfileResponse) => {
        this.populateUserProfile(userProfileResponse);
      });
  }

  public removeUserProfile(): void {
    console.log('removing userProfile in Profile Service');

    localStorage.removeItem('templateUI-userProfile');

    // TODO tell all of the subscribers that this can be completed
    this.currentUserProfileSubject.next(null);
  }

 private async loadUserProfile<T>(): Promise<UserProfileResponse> {
    const data = await this.httpClient
      .get<UserProfileResponse>(this._USER_PROFILE_URL)
      .toPromise();
    // console.log(data);

    return data;
  }

  private populateUserProfile(userProfileResponse: UserProfileResponse): void {
    console.log('populating userProfile in Profile Service', userProfileResponse);

    const userProfile = new UserProfile(userProfileResponse);
    localStorage.setItem('templateUI-userProfile', JSON.stringify(userProfile));
    this.currentUserProfileSubject.next(userProfile);
  }

  // /**
  //  * Public method to check whether a user is logged on.
  //  */
  // isLoggedOn(): Observable<boolean> {
  //
  //   return this.isUserLoggedOn.asObservable();
  // }
  //
  // // Public method to get the user profile who is logged on.
  // getUserProfile(): Observable<UserProfile> {
  //
  //   return this.currentUserProfileSubject.asObservable();
  // }
  //


}
