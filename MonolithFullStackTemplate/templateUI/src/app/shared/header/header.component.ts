import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserProfile} from '../../users/profile/user.profile';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserProfileService} from '../../_services/user.profile.service';
import {LinksService} from '../../_services/links-service';
import {AuthService} from '../../_services/auth-service';
import {ProfileService} from '../../_services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedOn: boolean;
  usersAccess: boolean;
  peopleAccess: boolean;

  userProfile: UserProfile;

  @Output()
  toggleSidenav = new EventEmitter<void>(); // event used to toggle sidenav

  /**
   * Subscribe to see whether there is a user currently logged on.
   */
  constructor(private router: Router,
              private authenticationService: AuthService,
              private profileService: ProfileService,
              private linksService: LinksService) {
  }

  ngOnInit(): void {
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
    // this.userProfileService.removeUserProfile();
    this.getAreasAccess();
    this.router.navigate(['/home']);
  }

  getProfile(): void {
    // TODO fix get user details profile - send the user to the user profile component and pass user profile as data
    // const dataObject = {state: {data: {userProfile: this.userProfile}}};
    this.router.navigate(['userdetails', this.userProfile.id]);
  }

  getUsers(): void {
    const dataObject = {state: {usersLink: this.userProfile.links.users}};
    this.router.navigate(['users'], dataObject);
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
}
