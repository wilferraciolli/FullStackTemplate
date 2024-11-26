import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserSessionStore} from "../_services/user-session-store/user-session.store";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  private _userSessionStore = inject(UserSessionStore);
  private _router: Router = inject(Router);

  constructor() {
  }

  /**
   * Specifies the parameters (route: ActivatedRouteSnapshot, state: RouterStateSnapshot), these are required to implement the CanActivate interface.
   * Gets the value of the current user by accessing the authenticationService.currentUserValue property.
   * Returns true if the currentUser contains a value, meaning that the user is logged in.
   * Calls this.router.navigate() to navigate to the /login route if the user is not logged in, passing the returnUrl as a query parameter so the user can be redirected back to their original requested page after logging in.
   * Returns false if the user is not logged in to cancel navigation to the current route.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._userSessionStore.isUserLoggedOn()) {
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], {queryParams: {returnUrl: state.url}});

    return false;
  }
}
