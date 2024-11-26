import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {Router} from '@angular/router';
import {LinksService} from '../../_services/links-service';
import {ProfileService} from '../../_services/profile.service';
import {MatSidenav} from "@angular/material/sidenav";
import {UserSessionStore} from "../../_services/user-session-store/user-session.store";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  private readonly _userStore = inject(UserSessionStore);

  public usersAccess: WritableSignal<boolean> = signal(false);
  public peopleAccess: WritableSignal<boolean> = signal(false);

  constructor(private router: Router,
              private profileService: ProfileService,
              private linksService: LinksService) {
  }

  ngOnInit(): void {
    this._getAreasAccess();
  }

  public getUsers(sidenav: MatSidenav): void {
    sidenav.toggle();
    const dataObject = {state: {usersLink: this._userStore.userProfile()?.links.users}};
    this.router.navigate(['users'], dataObject);
  }

  public getPeople(sidenav: MatSidenav): void {
    sidenav.toggle();
    const dataObject = {state: {peopleLink: this._userStore.userProfile()?.links.people}};
    this.router.navigate(['people'], dataObject);
  }

  /**
   * Get the user profile for the person logged on. This can be used to work out areas access.
   */
  private _getAreasAccess(): void {
    if (this._userStore.userProfile()) {
      this.usersAccess.set(this.linksService.hasLink(this._userStore.userProfile()?.links.users));
      this.peopleAccess.set(this.linksService.hasLink(this._userStore.userProfile()?.links.people));
    } else {
      this.usersAccess.set(false);
      this.peopleAccess.set(false);
    }
  }
}
