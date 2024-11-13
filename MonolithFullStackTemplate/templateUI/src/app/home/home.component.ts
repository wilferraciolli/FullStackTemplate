import {Component, inject, OnInit, Signal} from '@angular/core';
import {Router} from '@angular/router';
import {UserSessionStore} from "../_services/user-session-store/user-session.store";
import {UserProfile} from "../_services/classes/user.profile";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly userStore = inject(UserSessionStore);

  public user: Signal<UserProfile | null> = this.userStore.userProfile;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

  getQuotes(): void {
    this.route.navigate(['/user_invitation']);
  }
}
