import { Component, OnInit } from '@angular/core';
import { UserRegistration } from './user-registration';
import { debounceTime, distinctUntilChanged, first, switchMapTo, take, tap } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NotificationService } from '../shared/notification.service';
import { AuthService } from '../_services/auth-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private readonly _NAME_AVAILABILITY_URL = 'iam/users/usernames/availability?username=';

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  hide = true;
  error: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService,
              private notificationService: NotificationService,
              private httpClient: HttpClient) {

    // redirect to home if already logged in
    // if (this.authenticationService.isUserLoggedOn) {
    //   this.router.navigate(['/']);
    // }

    this.authenticationService.isUserLoggedOn
      .subscribe(x => {
        if (x === true) {
          this.router.navigate(['/']);
        }
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    // initialize form with default values
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['']
    });
  }

  register(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const userRegistration = new UserRegistration(
      this.f.firstName.value,
      this.f.lastName.value,
      this.f.email.value,
      this.f.password.value,
      this.f.dateOfBirth.value
    );

    this.authenticationService.register(userRegistration)
      .pipe(first())
      .subscribe(
        data => {
          this.notificationService.success('User Created successfully');
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

  public isUsernameAvailable(username: string): boolean {

    this.httpClient.get<boolean>(environment.baseUrl + this._NAME_AVAILABILITY_URL + '?username=' + username)
      .subscribe((data: boolean) => {

        console.log('username availability', data);
      });

    return true;
  }
}
