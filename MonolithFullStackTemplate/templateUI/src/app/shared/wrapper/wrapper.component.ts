import {Component, OnInit} from '@angular/core';
import {UserProfile} from '../../_services/classes/user.profile';
import {Router} from '@angular/router';
import {LinksService} from '../../_services/links-service';
import {ProfileService} from '../../_services/profile.service';
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  public usersAccess: boolean = false;
  public peopleAccess: boolean = false;

  private userProfile!: UserProfile;

  constructor(private router: Router,
              private profileService: ProfileService,
              private linksService: LinksService) {
  }

  ngOnInit(): void {
    this.profileService.currentUserProfile
      .subscribe((user: UserProfile) => {
        this.userProfile = user;
        this._getAreasAccess();
      });
  }

  public getUsers(sidenav: MatSidenav): void {
    sidenav.toggle();
    const dataObject = {state: {usersLink: this.userProfile.links.users}};
    this.router.navigate(['users'], dataObject);
  }

  public getPeople(sidenav: MatSidenav): void {
    sidenav.toggle();
    const dataObject = {state: {peopleLink: this.userProfile.links.people}};
    this.router.navigate(['people'], dataObject);
  }

  /**
   * Get the user profile for the person logged on. This can be used to work out areas access.
   */
  private _getAreasAccess(): void {

    if (this.userProfile) {
      this.usersAccess = this.linksService.hasLink(this.userProfile.links.users);
      this.peopleAccess = this.linksService.hasLink(this.userProfile.links.people);
    } else {
      this.usersAccess = false;
      this.peopleAccess = false;
    }
  }
}
