import {Component, inject, OnInit, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {UserSessionStore} from "../_services/user-session-store/user-session.store";
import {UserProfile} from "../_services/classes/user.profile";
import {UserSetting} from "../_services/classes/user-settings-available";
import {IAuthDetails} from "../_services/interfaces/IAuthDetails";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly userStore = inject(UserSessionStore);

  public user: Signal<UserProfile | null> = this.userStore.userProfile;
  public lang: Signal<UserSetting | null> = this.userStore.userLanguage;
  public auth: Signal<IAuthDetails | null> = this.userStore.userAuth;
  public isLoggedOn: Signal<boolean | null> = this.userStore.isUserLoggedOn;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

  getQuotes(): void {
    this.route.navigate(['/user_invitation']);
  }
}
