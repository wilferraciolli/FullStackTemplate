import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserProfileResponse} from '../users/profile/user.profile.response';
import {UserProfile} from '../users/profile/user.profile';

@Injectable({providedIn: 'root'})
export class ProfileService {

  private readonly _USER_PROFILE_URL: string = environment.baseUrl + '/api/iam/userprofile';

  public currentUserProfile: Observable<UserProfile>;
  private currentUserProfileSubject: BehaviorSubject<UserProfile>;

  /**
   * Constructor.
   */
  constructor(private httpClient: HttpClient) {
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
    this.currentUserProfileSubject.complete();
  }

  private async loadUserProfile<T>(): Promise<UserProfileResponse> {

    let headers: HttpHeaders = new HttpHeaders();
    headers.append('content-type','application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
    // headers.append('Origin', 'http://localhost:4200');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');

    // @ts-ignore
    const data: UserProfileResponse = await this.httpClient
      .get<UserProfileResponse>(this._USER_PROFILE_URL, { headers})
      .toPromise();
    // console.log(data);

    return data;
  }

  private populateUserProfile(userProfileResponse: UserProfileResponse): void {
    console.log('populating userProfile in Profile Service', userProfileResponse);

    const userProfile: UserProfile = new UserProfile(userProfileResponse);
    localStorage.setItem('templateUI-userProfile', JSON.stringify(userProfile));
    this.currentUserProfileSubject.next(userProfile);
  }
}
