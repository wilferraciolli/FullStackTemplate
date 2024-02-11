import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserProfile } from '../../_services/classes/user.profile';
import { Router } from '@angular/router';
import { LinksService } from '../../_services/links-service';
import { AuthService } from '../../_services/auth-service';
import { ProfileService } from '../../_services/profile.service';
import { ValueViewValue } from '../response/value-viewValue';
import { UserSettingService } from "../../_services/user-setting.service";
import { UserSetting } from "../../_services/classes/user-settings-available";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedOn: boolean = false;
  usersAccess: boolean = false;
  peopleAccess: boolean = false;

  availableLanguages: Array<ValueViewValue> = [];

  userProfile!: UserProfile;
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

  ngOnInit(): void {
    this.availableLanguages = [
      new ValueViewValue(UserSetting.englishLanguage.id, 'header.language.english'),
      new ValueViewValue(UserSetting.greekLanguage.id, 'header.language.greek'),
      new ValueViewValue(UserSetting.portugueseLanguage.id, 'header.language.portuguese')
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
    this.profileService.removeUserProfile();
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
  useLanguage(language: ValueViewValue): void {
    this.userSettingService.setUserLanguage({
      id: language.value,
      name: language.viewValue
    });
  }

}
