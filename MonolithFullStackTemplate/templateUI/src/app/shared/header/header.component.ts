import {Component, EventEmitter, inject, OnInit, Output, signal, Signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {LinksService} from '../../_services/links-service';
import {AuthService} from '../../_services/auth-service';
import {ProfileService} from '../../_services/profile.service';
import {ValueViewValue} from '../response/value-viewValue';
import {UserSettingService} from "../../_services/user-setting.service";
import {UserSetting} from "../../_services/classes/user-settings-available";
import {UserSessionStore} from "../../_services/user-session-store/user-session.store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly _userStore = inject(UserSessionStore);

  public isLoggedOn: Signal<boolean> = this._userStore.isUserLoggedOn;
  public usersAccess: WritableSignal<boolean> = signal(false);
  public peopleAccess: WritableSignal<boolean> = signal(false);

  availableLanguages: Array<ValueViewValue> = [];

  @Output()
  toggleSidenav = new EventEmitter<void>(); // event used to toggle sidenav

  /**
   * Subscribe to see whether there is a user currently logged on.
   */
  constructor(private router: Router,
              private authenticationService: AuthService,
              private profileService: ProfileService,
              private linksService: LinksService,
              private userSettingService: UserSettingService) {
  }

  public ngOnInit(): void {
    this.availableLanguages = [
      new ValueViewValue(UserSetting.englishLanguage.id, 'header.language.english'),
      new ValueViewValue(UserSetting.greekLanguage.id, 'header.language.greek'),
      new ValueViewValue(UserSetting.portugueseLanguage.id, 'header.language.portuguese')
    ];

    this.getAreasAccess();
  }

  /**
   * Logs the user out and redirect to home.
   */
  logout(): void {
    this.authenticationService.logout();
    this.profileService.removeUserProfile();
    this.getAreasAccess();
    this.router.navigate(['/home']);
  }

  getProfile(): void {
    this.router.navigate(['userdetails', this._userStore.userProfile()?.id]);
  }

  getUsers(): void {
    const dataObject = {state: {usersLink: this._userStore.userProfile()?.links.users}};
    this.router.navigate(['users'], dataObject);
  }

  getPeople(): void {
    const dataObject = {state: {peopleLink: this._userStore.userProfile()?.links.people}};
    this.router.navigate(['people'], dataObject);
  }

  /**
   * Get the user profile for the person logged on. This can be used to work out areas access.
   */
  private getAreasAccess(): void {
    if (this._userStore.userProfile()) {
      this.usersAccess.set(this.linksService.hasLink(this._userStore.userProfile()?.links.users));
      this.peopleAccess.set(this.linksService.hasLink(this._userStore.userProfile()?.links.people));
    } else {
      this.usersAccess.set(false);
      this.peopleAccess.set(false);
    }
  }

  /**
   * Set the language to be used.
   * @param language the language id to be used
   */
  useLanguage(language: ValueViewValue): void {
    this.userSettingService.setUserLanguage({
      id: language.value,
      name: language.viewValue
    });
  }

}
