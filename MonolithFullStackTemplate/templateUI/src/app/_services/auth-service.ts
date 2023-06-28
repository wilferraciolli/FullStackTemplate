import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {finalize, map} from 'rxjs/operators';
import {UserRegistration} from '../registration/user-registration';

import jwt_decode from 'jwt-decode';
import {ProfileService} from './profile.service';
import {LoadingService} from '../shared/components/loading/loading.service';
import {IAuthDetails} from "./interfaces/IAuthDetails";
import * as _ from "lodash";

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly _AUTHENTICATION_URL: string = '/api/auth';
  private readonly _REFRESH_TOKEN_URL: string = '/api/auth/refresh/token';

  private refreshTokenTimeout!: any;

  public isUserLoggedOn: Observable<boolean>;
  private isUserLoggedOnSubject: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
    private profileService: ProfileService,
    private loadingService: LoadingService) {

    this.isUserLoggedOnSubject = new BehaviorSubject<boolean>(this.hasValidTokenAndCredentials());
    this.isUserLoggedOn = this.isUserLoggedOnSubject.asObservable();
  }

  /**
   * Public method to check whether a user is logged on.
   */
  public get isLoggedOn(): boolean {
    return this.isUserLoggedOnSubject.value;
  }

  public login(authentication: any): any {
    this.loadingService.loadingOn();

    return this.httpClient
      .post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/signin', authentication)
      .pipe(
        map(authDetails => {
          this.saveAuthDetails(authDetails);
          this.profileService.fetchUserProfile();

          return authDetails;
        }),
        finalize(() => this.loadingService.loadingOff()));
  }

  public logout(): void {

    //TODO need to test this
    // this.loadingService.loadingOn();
    // this.httpClient
    //   .post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/logout', {});
    // this.loadingService.loadingOff();


    this.removeUser();
    this.profileService.removeUserProfile();
    this.stopRefreshTokenTimer();
  }

  public register(userDetails: UserRegistration): any {
    console.log(userDetails);

    this.loadingService.loadingOn();
    return this.httpClient
      .post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/register', userDetails)
      .pipe(map(user => {
          console.log(user);
          return user;
        }),
        finalize(() => this.loadingService.loadingOff()));
  }

  private hasValidTokenAndCredentials(): boolean {
    console.log('is logged on ', this.isTokenExpired());
    return !this.isTokenExpired();
  }

  public getTokenFromLocalStorage(): string {
    const authDetailsFromStorage: string | null = localStorage.getItem('templateUI-authDetails');

    if (authDetailsFromStorage) {
      const authDetails: IAuthDetails = JSON.parse(authDetailsFromStorage);

      return authDetails.access_token;
    }

    return '';
  }

  isTokenExpired(token?: string | null): boolean {
    if (!token) {
      token = this.getTokenFromLocalStorage();
    }
    if (!token) {
      return true;
    }

    const date: Date | null = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !_.isNull(date)
      && (date.valueOf() > new Date().valueOf());
  }

  private getRefreshToken(): string {

    // @ts-ignore
    const authDetails = JSON.parse(localStorage.getItem('templateUI-authDetails'));

    if (authDetails) {

      return authDetails.refresh_token;
    } else {

      return '';
    }
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date: Date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  private startRefreshTokenTimer(): void {
    // parse json object from base64 encoded jwt token
    const jwtToken: { exp: number } = jwt_decode(this.getTokenFromLocalStorage()) as { exp: number };

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

  private removeUser(): void {
    localStorage.removeItem('templateUI-authDetails');

    // tell all of the subscribers
    this.isUserLoggedOnSubject.next(false);
  }

  private saveAuthDetails(authDetails: any): void {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('templateUI-authDetails', JSON.stringify(authDetails));
    this.isUserLoggedOnSubject.next(true);
    this.startRefreshTokenTimer();
  }
}
