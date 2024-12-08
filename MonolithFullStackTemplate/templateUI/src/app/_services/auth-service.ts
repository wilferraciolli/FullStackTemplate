import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {finalize, map} from 'rxjs/operators';
import {UserRegistration} from '../registration/user-registration';

import jwt_decode from 'jwt-decode';
import {LoadingService} from '../shared/components/loading/loading.service';
import {IAuthDetails} from "./interfaces/IAuthDetails";
import * as _ from "lodash";
import {ITokenDetails} from "./interfaces/ITokenDetails";
import {Login} from "../login/login";
import {StorageService} from "./storage/storage.service";
import {AUTH_DETAILS_KEY} from "./storage/storage-known-key.constant";
import {UserSessionStore} from "./user-session-store/user-session.store";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly _AUTHENTICATION_URL: string = '/api/auth';
  private readonly _REFRESH_TOKEN_URL: string = '/api/auth/refresh/token';

  private _storageService: StorageService = inject(StorageService);
  private _userSessionStore = inject(UserSessionStore);
  private _httpClient = inject(HttpClient);
  private _loadingService = inject(LoadingService);

  private refreshTokenTimeout!: any;

  constructor() {
  }

  public login(authentication: Login): Observable<IAuthDetails> {
    this._loadingService.loadingOn();

    return this._httpClient
      .post<IAuthDetails>(environment.baseUrl + this._AUTHENTICATION_URL + '/signin', authentication)
      .pipe(
        map((authDetails: IAuthDetails) => {
          this.saveAuthDetails(authDetails);

          return authDetails;
        }),
        finalize(() => this._loadingService.loadingOff()));
  }

  public logout(): void {
    this._removeUser();
    this.stopRefreshTokenTimer();
  }

  // TODO This should just be a void as there is no response from API
  public register(userDetails: UserRegistration): any {
    this._loadingService.loadingOn();
    return this._httpClient
      .post<any>(environment.baseUrl + this._AUTHENTICATION_URL + '/register', userDetails)
      .pipe(map((): void => {
          return;
        }),
        finalize(() => this._loadingService.loadingOff()));
  }

  private hasValidTokenAndCredentials(): boolean {
    const isTokenExpired: boolean = !this.isTokenExpired();

    console.log('is token expired ', isTokenExpired);
    return isTokenExpired;
  }

  public getTokenFromLocalStorage(): string {
    const authDetailsFromStorage: IAuthDetails | null = this._storageService.getFromLocalStorage<IAuthDetails>(AUTH_DETAILS_KEY);

    if (authDetailsFromStorage) {
      return authDetailsFromStorage.access_token;
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
    const authDetailsStorage: IAuthDetails | null = this._storageService.getFromLocalStorage<IAuthDetails>(AUTH_DETAILS_KEY);
    if (authDetailsStorage) {
      return authDetailsStorage.refresh_token;
    }

    return '';
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
  private _refreshToken(): Observable<IAuthDetails> {
    return this._httpClient
      .post<any>(environment.baseUrl + this._REFRESH_TOKEN_URL, {'refreshToken': this.getRefreshToken()})
      .pipe(map((authDetails: IAuthDetails) => {

        this.saveAuthDetails(authDetails);
        return authDetails;
      }));
  }

  private _removeUser(): void {
    this._storageService.removeItem(AUTH_DETAILS_KEY);
    this._userSessionStore.updateUserAuth(null);
  }

  private saveAuthDetails(authDetails: IAuthDetails): void {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    this._storageService.addToLocalStorage<IAuthDetails>(AUTH_DETAILS_KEY, authDetails);
    this._userSessionStore.updateUserAuth(authDetails);
    this.startRefreshTokenTimer();
  }
}
