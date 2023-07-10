import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {UserProfile} from '../../_services/classes/user.profile';
import {ProfileService} from '../../_services/profile.service';
import {INavigationTabs} from "../../_services/interfaces/INavigationTabs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  public routeLinks: INavigationTabs[];

  private activeLinkIndex: number = -1;
  private userProfile!: UserProfile;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private profileService: ProfileService) {

    // create navigation links for children
    this.routeLinks = [
      {
        label: 'Profile',
        link: './profile',
        index: 0
      }, {
        label: 'User Settings',
        link: './settings',
        index: 1
      },
      {
        label: 'Template',
        link: './template',
        index: 2
      }
    ];
  }

  ngOnInit(): void {

    this.profileService.currentUserProfile
      .subscribe((user: UserProfile) => {
        this.userProfile = user;
      });

    // send the request to home if no user details is present
    if (_.isUndefined(this.userProfile)) {
      this.router.navigate(['/home']);
    } else {

      // get the active children to display its component
      this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.routeLinks.indexOf(<INavigationTabs>this.routeLinks.find((tab: INavigationTabs) => tab.link === '.' + this.router.url));
      });
    }
  }
}
