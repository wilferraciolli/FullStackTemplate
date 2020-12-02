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
export class AuthService {

  private readonly _AUTHENTICATION_URL = '/api/auth';
  private readonly _REFRESH_TOKEN_URL = '/api/auth/refresh/token';

  private readonly _USER_PROFILE_URL = environment.baseUrl + '/api/userprofile';

  private refreshTokenTimeout;

  isUserLoggedOn: BehaviorSubject<boolean>;

  // public currentUserProfile: Observable<UserProfile>;
  currentUserProfileSubject: BehaviorSubject<UserProfile>;

  /**
   * Constructor.
   */
  constructor(private httpClient: HttpClient) {

    this.isUserLoggedOn = new BehaviorSubject<boolean>(this.hasValidToken());
    this.currentUserProfileSubject = new BehaviorSubject<UserProfile>(JSON.parse(localStorage.getItem('templateUI-userProfile')));
    // this.currentUserProfile = this.currentUserProfileSubject.asObservable();
  }

  /**
   * Public method to check whether a user is logged on.
   */
  isLoggedOn(): Observable<boolean> {

    return this.isUserLoggedOn.asObservable();
  }

  // Public method to get the user profile who is logged on.
  getUserProfile(): Observable<UserProfile> {

    return this.currentUserProfileSubject.asObservable();
  }

  login(authentication): any {

    return this.httpClient
      .post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/signin', authentication)
      .pipe(map(authDetails => {
        this.saveAuthDetails(authDetails);

        // get the user profile
        this.loadUserProfile()
          .then((userProfileResponse) => {
            this.populateUserProfile(userProfileResponse);
          });

        return authDetails;
      }));
  }

  logout(): void {
    // remove user from local storage and set current user to null
    this.removeUser();
    // this.stopRefreshTokenTimer();
    // this.removeLocalStorageUserLoggedOn();
  }

  register(userDetails: UserRegistration): any {
    console.log(userDetails);

    return this.httpClient
      .post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/register', userDetails)
      .pipe(map(user => {
        console.log(user);
        return user;
      }));
  }

  private hasValidToken(): boolean {

    return false;
  }

  async loadUserProfile<T>(): Promise<UserProfileResponse> {
    const data = await this.httpClient
      .get<UserProfileResponse>(this._USER_PROFILE_URL)
      .toPromise();
    // console.log(data);

    return data;
  }

  /**
   * Get the current user from the local storage.
   */
  private getToken(): string {

    const authDetails = JSON.parse(localStorage.getItem('templateUI-authDetails'));

    if (authDetails) {

      return authDetails.access_token;
    } else {

      return null;
    }
  }

  private getRefreshToken(): string {

    const authDetails = JSON.parse(localStorage.getItem('templateUI-authDetails'));

    if (authDetails) {

      return authDetails.refresh_token;
    } else {

      return null;
    }
  }

  private getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  private isTokenExpired(token?: string): boolean {
    if (!token) {
      token = this.getToken();
    }
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  private startRefreshTokenTimer(): void {
    // parse json object from base64 encoded jwt token
    const jwtToken = jwt_decode(this.getToken());

    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

  refreshToken(): any {

    return this.httpClient
      .post<any>(environment.baseUrl + this._REFRESH_TOKEN_URL, {'refreshToken': this.getRefreshToken()})
      .pipe(map((authDetails) => {

        this.saveAuthDetails(authDetails);
        return authDetails;
      }));
  }

  private populateUserProfile(userProfileResponse: UserProfileResponse): void {
    console.log('populating userProfile in Auth Service', userProfileResponse);

    const userProfile = new UserProfile(userProfileResponse);
    localStorage.setItem('templateUI-userProfile', JSON.stringify(userProfile));
    this.isUserLoggedOn.next(true);
    this.currentUserProfileSubject.next(userProfile);
  }

  private removeUser(): void {
    console.log('removing userProfile in Auth Service');

    localStorage.removeItem('templateUI-userProfile');
    localStorage.removeItem('templateUI-authDetails');

    // tell all of the subscribers
    this.currentUserProfileSubject.next(null);
    this.isUserLoggedOn.next(false);
  }

  private saveAuthDetails(authDetails): void {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('templateUI-authDetails', JSON.stringify(authDetails));
    this.startRefreshTokenTimer();
  }
}
