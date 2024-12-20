import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserProfile} from './classes/user.profile';

//TODO remove this service as not in use anymore

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private readonly _USER_PROFILE_URL = environment.baseUrl + '/api/iam/userprofile';

  public currentUserProfile: Observable<UserProfile>;
  private currentUserProfileSubject: BehaviorSubject<UserProfile>;

  constructor(private httpClient: HttpClient) {
    // get the user profile from storage
    // @ts-ignore
    this.currentUserProfileSubject = new BehaviorSubject<UserProfile>(JSON.parse(localStorage.getItem('userProfile')));
    this.currentUserProfile = this.currentUserProfileSubject.asObservable();
  }

  public get currentUserProfileValue(): UserProfile {

    return this.currentUserProfileSubject.value;
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$(): Subject<void> {

    return this._refreshNeeded$;
  }

  async loadUserProfile<T>(): Promise<any> {
    const data = await this.httpClient.get<T>(this._USER_PROFILE_URL)
      .toPromise();

    return data;
  }

  // getUserProfile<T>(): Observable<T> {
  //
  //   return this.httpClient.get<T>(this._USER_PROFILE_URL)
  //     .pipe(
  //       tap(() => this.refreshNeeded$.next()),
  //       retry(1),
  //       catchError(this.handleError));
  // }
  //
  // handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'Unknown error!';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side errors
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Server-side errors
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }

  // populateUserProfile(userProfileResponse: UserProfileResponse): void {
  //   const userProfile = new UserProfile(userProfileResponse);
  //   localStorage.setItem('userProfile', JSON.stringify(userProfile));
  //   this.currentUserProfileSubject.next(userProfile);
  // }

  removeUserProfile(): void {
    console.log('removing userProfile in UserProfileService');

    // tell all of the subscribers that the user profile is null
    this.currentUserProfileSubject.complete();
  }
}
