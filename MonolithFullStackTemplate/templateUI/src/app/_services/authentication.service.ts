import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

import * as _ from 'lodash';
import {UserRegistration} from '../registration/user-registration';
import jwt_decode from "jwt-decode";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private readonly _AUTHENTICATION_URL: string = '/api/auth';
  private readonly _REFRESH_TOKEN_URL: string = '/api/auth/refresh/token';

  private refreshTokenTimeout: any;

  public currentUser: Observable<any>;
  public isUserLoggedOn: boolean;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    // check whether the token is expired
    // if (this.isTokenExpired()) {
    //   this.removeLocalStorageUserLoggedOn();
    //
    //   this.currentUserSubject = new BehaviorSubject<any>({});
    //   this.currentUser = this.currentUserSubject.asObservable();
    //   this.isUserLoggedOn = false;
    // } else {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.isUserLoggedOn = !_.isNull(localStorage.getItem('currentUser'));
    // }
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  /**
   * Get the current user from the local storage.
   */
  getToken(): string {
    const currentUser = this.currentUserValue;

    if (currentUser && currentUser.access_token) {
      return this.currentUserSubject.value.access_token;
    } else {
      return '';
    }
  }

  getRefreshToken(): string {
    const currentUser = this.currentUserValue;

    if (currentUser && currentUser.refresh_token) {
      return this.currentUserSubject.value.refresh_token;
    } else {

      return '';
    }
  }

  getTokenExpirationDate(token: string): Date | null {
    const decoded: { exp: number } = jwt_decode(token) as { exp: number };

    if (decoded.exp === undefined) {
      return null;
    }

    const date: Date = new Date(0);
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

    const date: Date | null = this.getTokenExpirationDate(token);

    return !_.isNull(date)
      && (date.valueOf() > new Date().valueOf());
  }

  //TODO remove
  // login(username: string, password: string): Observable<any> {
  //
  //   return this.http.post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/signin', {username, password})
  //     .pipe(map(user => {
  //
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //       this.startRefreshTokenTimer();
  //
  //       return user;
  //     }));
  // }

  // login1(authentication) {
  //
  //   return this.http.post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/signin', authentication)
  //     .pipe(map(user => {
  //
  //       // store user details and jwt token in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //       this.startRefreshTokenTimer();
  //
  //       return user;
  //     }));
  // }

  refreshToken(): Observable<any> {
    return this.http.post<any>(environment.baseUrl + this._REFRESH_TOKEN_URL, {'refreshToken': this.getRefreshToken()})
      .pipe(map((user) => {
        this.currentUserSubject.next(user);
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  private startRefreshTokenTimer(): void {
    // parse json object from base64 encoded jwt token
    const jwtToken: { exp: number } = jwt_decode(this.getToken()) as { exp: number };

    // set a timeout to refresh the token a minute before it expires
    const expires: Date = new Date(jwtToken.exp * 1000);
    const timeout: number = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

  //TODO not working
  // async refreshTokenV1(refreshToken) {
  //
  //   localStorage.removeItem('currentUser');
  //
  //   let user = await this.http.post(environment.baseUrl + this._REFRESH_TOKEN_URL, {refreshToken})
  //     .toPromise();
  //
  //   // store user details and jwt token in local storage to keep user logged in between page refreshes
  //   localStorage.setItem('currentUser', JSON.stringify(user));
  //   this.currentUserSubject.next(user);
  // }

  logout(): void {
    // remove user from local storage and set current user to null
    this.stopRefreshTokenTimer();
    this.removeLocalStorageUserLoggedOn();
    this.currentUserSubject.next(null);
  }

  register(userDetails: UserRegistration) {
    return this.http.post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/register', userDetails)
      .pipe(map(user => {
        return user;
      }));
  }

  private removeLocalStorageUserLoggedOn(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userProfile');
  }
}
