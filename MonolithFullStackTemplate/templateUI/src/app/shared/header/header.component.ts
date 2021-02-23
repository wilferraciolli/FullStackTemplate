import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserProfile } from '../../users/profile/user.profile';
import { Router } from '@angular/router';
import { LinksService } from '../../_services/links-service';
import { AuthService } from '../../_services/auth-service';
import { ProfileService } from '../../_services/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { ValueViewValue } from '../response/value-viewValue';
import { LocaleType } from '../locale.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedOn: boolean;
  usersAccess: boolean;
  peopleAccess: boolean;

  availableLanguages: Array<ValueViewValue>;

  userProfile: UserProfile;
  @Output()
  toggleSidenav = new EventEmitter<void>(); // event used to toggle sidenav

  /**
   * Subscribe to see whether there is a user currently logged on.
   */
  constructor(private router: Router,
              private authenticationService: AuthService,
              private profileService: ProfileService,
              private linksService: LinksService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {

    // TODO move to get it from user pref
    this.availableLanguages = [
      new ValueViewValue(LocaleType.ENGLISH, 'header.language.english'),
      new ValueViewValue(LocaleType.GREEK, 'header.language.greek'),
      new ValueViewValue(LocaleType.PORTUGUESE, 'header.language.portuguese')
    ];

    this.authenticationService.isUserLoggedOn
      .subscribe(x => {
        this.isLoggedOn = x;
      });

    this.profileService.currentUserProfile
      .subscribe(user => {
        this.userProfile = user;
        this.getAreasAccess();
      });
  }

  /**
   * Logs the user out and redirect to home.
   */
  logout(): void {
    this.authenticationService.logout();
    this.getAreasAccess();
    this.router.navigate(['/home']);
  }

  getProfile(): void {
    this.router.navigate(['userdetails', this.userProfile.id]);
  }

  getUsers(): void {
    const dataObject = { state: { usersLink: this.userProfile.links.users } };
    this.router.navigate(['users'], dataObject);
  }

  getPeople(): void {
    const dataObject = { state: { peopleLink: this.userProfile.links.people } };
    this.router.navigate(['people'], dataObject);
  }

  /**
   * Get the user profile for the person logged on. This can be used to work out areas access.
   */
  private getAreasAccess(): void {

    if (this.userProfile) {
      this.usersAccess = this.linksService.hasLink(this.userProfile.links.users);
      this.peopleAccess = this.linksService.hasLink(this.userProfile.links.people);
    } else {
      this.usersAccess = false;
      this.peopleAccess = false;
    }
  }

  /**
   * Set the language to be used.
   * @param language the language id to be used
   */
  useLanguage(language: string): void {

    localStorage.setItem('templateUI-chosenLanguage', language);
    this.translate.use(language);
  }

}
