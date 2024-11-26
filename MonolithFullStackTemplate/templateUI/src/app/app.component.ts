import {Component, inject} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UserSessionStore} from "./_services/user-session-store/user-session.store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'templateUI';

  private _translateService: TranslateService = inject(TranslateService);
  private _userSessionStore = inject(UserSessionStore);

  constructor() {
    // set fallback language
    this._translateService.setDefaultLang(this._userSessionStore.userLanguage().id);
  }
}
