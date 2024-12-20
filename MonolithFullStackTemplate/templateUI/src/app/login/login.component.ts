import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, first} from 'rxjs/operators';
import {AuthService} from '../_services/auth-service';
import {LoadingService} from '../shared/components/loading/loading.service';
import {ProfileService} from "../_services/profile.service";
import {LoginFormBuilder} from "./login-form-builder";
import {TranslateService} from "@ngx-translate/core";
import {UserSessionStore} from "../_services/user-session-store/user-session.store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly _userStore = inject(UserSessionStore);

  public loading: boolean = false;
  public submitted: boolean = false;
  public hide: boolean = true;

  public usernameRequiredErrorLabel: string | null = null;
  public usernameMinLenghtLabel: string | null = null;
  public usernameFormatErrorLabel: string | null = null;

  public passwordRequiredErrorLabel: string | null = null;

  private returnUrl!: string;
  private error!: string;

  /**
   * Specifies the dependencies that are required by the component as parameters, these are automatically injected by
   * the Angular Dependency Injection (DI) system when the component is created.
   * Checks if the user is already logged in by checking authenticationService.currentUserValue and redirects to the home page if they are.
   */
  constructor(
    public formBuilder: LoginFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private profileService: ProfileService,
    private loadingService: LoadingService,
    private translateService: TranslateService
  ) {

    // redirect to home if already logged in
    if (this._userStore.isUserLoggedOn()) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Is an Angular lifecycle hook that runs once after the component is created. For more info on Angular lifecycle hooks see https://angular.io/guide/lifecycle-hooks.
   * Creates a new FormGroup by calling this.formBuilder.group() and assigns it to the this.loginForm property. The parameters passed to the FormBuilder
   * tell it to create two form controls -   * username and password, the form controls are both initialised with empty strings ('') as values
   * and set to required with the Validators.required Angular validator.
   * Sets the this.returnUrl property to the value passed in the url querystring, or defaults to the home page ('/') if there isn't a value in the querystring. The return url property
   * allows you to redirect the user back to the original page they requested before logging in.
   */
  async ngOnInit(): Promise<void> {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // await this.translateService.use('en').toPromise();
    this.usernameRequiredErrorLabel = this.translateService.instant('form.validation.required');
    this.usernameMinLenghtLabel = this.translateService.instant('form.validation.minLength', {value: 3});
    this.usernameFormatErrorLabel = this.translateService.instant('form.validation.emailFormat');

    this.passwordRequiredErrorLabel = this.translateService.instant('form.validation.required');
  }

  /**
   * Sets the this.submitted property to true to indicate that an attempt has been made to submit the form, this property is used in the login component template to display validation errors only after the first submission has been attempted.
   * Checks if the form is valid by checking this.loginForm.invalid and prevents submission if it is invalid.
   * Sets the this.loading property to true before submitting the user credentials via the authentication service, this property is used in the login component template to display a loading spinner to the user and disable the login button.
   * Authenticates the user by calling the this.authenticationService.login() method with the username and password as parameters. The authentication service returns an Observable that we .subscribe() to for the results of the authentication. On success the user is redirected to the returnUrl by calling this.router.navigate([this.returnUrl]);. On fail the error message is stored in the this.error property to be displayed by the template and the this.loading property is reset back to false.
   * The call to .pipe(first()) unsubscribes from the observable immediately after the first value is emitted.
   */
  login(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formBuilder.form.invalid) {
      return;
    }

    this.loading = true;
    this.loadingService.loadingOn();
    this.authenticationService.login(this.formBuilder.getFormValue())
      .pipe(
        first(),
        finalize(() => this.loadingService.loadingOff()))
      .subscribe(() => {
          this.profileService.fetchUserProfile();
          this.router.navigate([this.returnUrl]);
        },
        (error: any): void => {
          this.error = error;
          this.loading = false;
        });
  }
}
