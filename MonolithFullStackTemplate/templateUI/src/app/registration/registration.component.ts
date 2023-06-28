import {Component, OnInit} from '@angular/core';
import {UserRegistration} from './user-registration';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';
import {AuthService} from '../_services/auth-service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private readonly _NAME_AVAILABILITY_URL = 'iam/users/usernames/availability?username=';

  registerForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  hide: boolean = true;
  error!: string;

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
    const userRegistration: UserRegistration = new UserRegistration(
      // @ts-ignore
      this.f.firstName.value,
      // @ts-ignore
      this.f.lastName.value,
      // @ts-ignore
      this.f.email.value,
      // @ts-ignore
      this.f.password.value,
      // @ts-ignore
      this.f.dateOfBirth.value
    );

    this.authenticationService.register(userRegistration)
      .pipe(first())
      .subscribe(
        (data: any): void => {
          this.notificationService.success('User Created successfully');
          this.router.navigate(['/login']);
        },
        (error: any): void => {
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
