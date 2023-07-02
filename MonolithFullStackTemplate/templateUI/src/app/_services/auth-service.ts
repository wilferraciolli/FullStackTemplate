import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {finalize, map} from 'rxjs/operators';
import {UserRegistration} from '../registration/user-registration';

import jwt_decode from 'jwt-decode';
import {LoadingService} from '../shared/components/loading/loading.service';
import {IAuthDetails} from "./interfaces/IAuthDetails";
import * as _ from "lodash";
import {ITokenDetails} from "./interfaces/ITokenDetails";
import {Login} from "../login/login";

@Injectable({providedIn: 'root'})
export class AuthService {

  private readonly _AUTHENTICATION_URL: string = '/api/auth';
  private readonly _REFRESH_TOKEN_URL: string = '/api/auth/refresh/token';

  private refreshTokenTimeout!: any;

  public isUserLoggedOn: Observable<boolean>;
  private isUserLoggedOnSubject: BehaviorSubject<boolean>;

  constructor(
    private httpClient: HttpClient,
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

  public login(authentication: Login): Observable<IAuthDetails> {
    this.loadingService.loadingOn();

    return this.httpClient
      .post<IAuthDetails>(environment.baseUrl + this._AUTHENTICATION_URL + '/signin', authentication)
      .pipe(
        map((authDetails: IAuthDetails) => {
          this.saveAuthDetails(authDetails);

          return authDetails;
        }),
        finalize(() => this.loadingService.loadingOff()));
  }

  public logout(): void {
    this._removeUser();
    this.stopRefreshTokenTimer();
  }

  // TODO This should just be a void as there is no response from API
  public register(userDetails: UserRegistration): any {
    this.loadingService.loadingOn();
    return this.httpClient
      .post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/register', userDetails)
      .pipe(map((): void => {
          return;
        }),
        finalize(() => this.loadingService.loadingOff()));
  }

  private hasValidTokenAndCredentials(): boolean {
    const isTokenExpired: boolean = !this.isTokenExpired();

    console.log('is token expired ', isTokenExpired);
    return isTokenExpired;
  }

  public getTokenFromLocalStorage(): string {
    const authDetailsFromStorage: string | null = localStorage.getItem('templateUI-authDetails');

    if (authDetailsFromStorage) {
      const authDetails: IAuthDetails = JSON.parse(authDetailsFromStorage);

      return authDetails.access_token;
    }

    return '';
  }

  public isTokenExpired(token?: string | null): boolean {
    if (!token) {
      token = this.getTokenFromLocalStorage();
    }
    if (!token) {
      return true;
    }

    const tokenExpireDateTime: Date | null = this.getTokenExpirationDate(token);
    if (tokenExpireDateTime === undefined) {
      return false;
    }

    return !_.isNull(tokenExpireDateTime)
      && (tokenExpireDateTime.valueOf() < new Date().valueOf());
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
    const decoded: ITokenDetails = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date: Date = new Date(0);
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  private startRefreshTokenTimer(): void {
    // parse json object from base64 encoded jwt token
    const jwtToken: ITokenDetails = jwt_decode(this.getTokenFromLocalStorage());

    // set a timeout to refresh the token a minute before it expires
    const expires: Date = new Date(jwtToken.exp * 1000);
    const timeout: number = expires.getTime() - Date.now() - (60 * 1000);
    this.refreshTokenTimeout = setTimeout(() => this._refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }

  // TODO add type
  private _refreshToken(): any {
    return this.httpClient
      .post<any>(environment.baseUrl + this._REFRESH_TOKEN_URL, {'refreshToken': this.getRefreshToken()})
      .pipe(map((authDetails) => {

        this.saveAuthDetails(authDetails);
        return authDetails;
      }));
  }

  private _removeUser(): void {
    localStorage.removeItem('templateUI-authDetails');

    // tell all of the subscribers
    this.isUserLoggedOnSubject.next(false);
  }

  private saveAuthDetails(authDetails: IAuthDetails): void {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('templateUI-authDetails', JSON.stringify(authDetails));
    this.isUserLoggedOnSubject.next(true);
    this.startRefreshTokenTimer();
  }
}
