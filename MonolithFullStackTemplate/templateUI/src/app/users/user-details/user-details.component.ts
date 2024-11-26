import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {INavigationTabs} from "../../_services/interfaces/INavigationTabs";
import {UserSessionStore} from "../../_services/user-session-store/user-session.store";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private readonly _userStore = inject(UserSessionStore);

  public routeLinks: INavigationTabs[];

  private activeLinkIndex: number = -1;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {

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
    // send the request to home if no user details is present
    if (this._userStore.isGuestUser()) {
      this.router.navigate(['/home']);
    } else {
      // get the active children to display its component
      this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.routeLinks.indexOf(<INavigationTabs>this.routeLinks.find((tab: INavigationTabs) => tab.link === '.' + this.router.url));
      });
    }
  }
}
