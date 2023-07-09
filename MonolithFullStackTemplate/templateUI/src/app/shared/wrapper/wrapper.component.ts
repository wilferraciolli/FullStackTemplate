import {Component, OnInit} from '@angular/core';
import {UserProfile} from '../../users/user-details/user-profile/user.profile';
import {Router} from '@angular/router';
import {LinksService} from '../../_services/links-service';
import {AuthService} from '../../_services/auth-service';
import {ProfileService} from '../../_services/profile.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  isLoggedOn: boolean = false;
  usersAccess: boolean = false;
  peopleAccess: boolean = false;

  isNavBarOpen: boolean = false;

  userProfile!: UserProfile;

  /**
   * Subscribe to see whether there is a user currently logged on.
   */
  constructor(private router: Router,
              private authenticationService: AuthService,
              private profileService: ProfileService,
              private linksService: LinksService) {

  }

  ngOnInit(): void {
    console.log('wrapper init ')
    this.authenticationService.isUserLoggedOn.subscribe(x => {
      this.isLoggedOn = x;
    });

    this.profileService.currentUserProfile
      .subscribe((user: UserProfile) => {
        this.userProfile = user;
        console.log('wrapper user logged on  ', this.userProfile);
        this.getAreasAccess();
      });
  }

  getUsers(): void {
    this.hideNavBar();
    const dataObject = {state: {usersLink: this.userProfile.links.users}};
    this.router.navigate(['users'], dataObject);
  }

  getPeople(): void {
    this.hideNavBar();
    const dataObject = {state: {peopleLink: this.userProfile.links.people}};
    this.router.navigate(['people'], dataObject);
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
