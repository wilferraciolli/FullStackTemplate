import {Component, OnInit} from '@angular/core';
import {UserProfile} from '../../users/profile/user.profile';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {UserProfileService} from '../../_services/user.profile.service';
import {LinksService} from '../../_services/links-service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  currentUser: any;
  usersAccess: boolean;
  peopleAccess: boolean;

  isNavBarOpen: boolean;

  userProfile: UserProfile;

  /**
   * Subscribe to see whether there is a user currently logged on.
   */
  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userProfileService: UserProfileService,
              private linksService: LinksService) {

  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });

    this.userProfileService.currentUserProfile
      .subscribe(user => {
        this.userProfile = user;
        this.getAreasAccess();
      });
  }

  getUsers() {
    this.hideNavBar();
    const dataObject = {state: {usersLink: this.userProfile.links.users}};
    this.router.navigate(['users'], dataObject);
  }

  hideNavBar(): void {
    this.isNavBarOpen = false;
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
