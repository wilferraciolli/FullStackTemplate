import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserProfile} from '../../home/user.profile';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserProfileService} from '../../_services/user.profile.service';
import {LinksService} from '../../_services/links-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  providersAccess: boolean;
  usersAccess: boolean;
  peopleAccess: boolean;

  userProfile: UserProfile;

  @Output()
  toggleSidenav = new EventEmitter<void>(); // event used to toggle sidenav

  /**
   * Subscribe to see whether there is a user currently logged on.
   */
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userProfileService: UserProfileService,
              private linksService: LinksService) {
  }

  ngOnInit(): void {
    this.authenticationService.currentUser
      .subscribe(x => {
        this.currentUser = x;
        this.getAreasAccess();
      });

    this.getAreasAccess();
  }

  /**
   * Logs the user out and redirect to home.
   */
  logout() {
    this.authenticationService.logout();
    this.getAreasAccess();
    this.router.navigate(['/home']);
  }

  getProfile(): void {
    // send the user to the user profile component and pass user profile as data
    const dataObject = {state: {data: {userProfile: this.userProfile}}};
    this.router.navigate(['userdetails', this.userProfile.userId], dataObject);
  }

  getUsers(): void {
    const dataObject = {state: {usersLink: this.userProfile.links.users}};
    this.router.navigate(['users'], dataObject);
  }

  /**
   * Get the user profile for the person logged on. This can be used to work out areas access.
   */
  private getAreasAccess(): void {

    if (this.currentUser) {
      this.userProfileService.loadUserProfile()
        .then((data) => {
          this.userProfile = new UserProfile(data);

          console.log('HEADER userProfile', this.userProfile);

          this.providersAccess = this.linksService.hasLink(this.userProfile.links.providers);
          this.usersAccess = this.linksService.hasLink(this.userProfile.links.users);
          this.peopleAccess = this.linksService.hasLink(this.userProfile.links.people);
        });
    } else {
      this.providersAccess = false;
      this.usersAccess = false;
      this.peopleAccess = false;
    }
  }
}
