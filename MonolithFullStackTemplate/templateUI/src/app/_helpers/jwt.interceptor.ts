import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../_services/auth-service';
import {UserSessionStore} from "../_services/user-session-store/user-session.store";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _userSessionStore = inject(UserSessionStore);
  private _authenticationService: AuthService = inject(AuthService);

  constructor() {
  }

  /**
   * Checks if the user is logged in by checking the authenticationService.currentUserValue exists and has a token property.
   * Clones the request and adds the Authorization header with the current user's JWT token with the 'Bearer ' prefix to indicate that it's a bearer token (required for JWT). The request object is immutable so it is cloned to add the auth header.
   * Passes the request to the next handler in the chain by calling next.handle(request).
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const tokenFromLocalStorage: string = this._authenticationService.getTokenFromLocalStorage();

    if (tokenFromLocalStorage
      && this._userSessionStore.isUserLoggedOn()
      && !this._authenticationService.isTokenExpired()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenFromLocalStorage}`,
          // 'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': '*',
          Accept: 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
