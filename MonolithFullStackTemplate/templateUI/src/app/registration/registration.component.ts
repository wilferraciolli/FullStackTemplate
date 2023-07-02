import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';
import {AuthService} from '../_services/auth-service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RegistrationFormBuilder} from "./registration-form-builder";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private readonly _NAME_AVAILABILITY_URL: string = 'iam/users/usernames/availability?username=';

  public loading: boolean = false;
  public submitted: boolean = false;
  public hide: boolean = true;
  private error!: string;

  constructor(
    public formBuilder: RegistrationFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private notificationService: NotificationService,
    private httpClient: HttpClient) {

    this.authenticationService.isUserLoggedOn
      .subscribe((alreadyLoggedOn: boolean) => {
        if (alreadyLoggedOn) {
          this.router.navigate(['/']);
        }
      });
  }

  ngOnInit(): void {
  }

  public register(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formBuilder.form.invalid) {
      console.log('Register form is invalid')
      return;
    }

    this.loading = true;
    this.authenticationService.register(this.formBuilder.getFormValue())
      .pipe(first())
      .subscribe(
        (): void => {
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
