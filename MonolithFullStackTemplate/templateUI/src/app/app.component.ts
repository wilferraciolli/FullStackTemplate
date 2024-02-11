import { Component, inject } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { UserSettingService } from "./_services/user-setting.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'templateUI';

  private _userSettingService: UserSettingService = inject(UserSettingService);
  private _translateService: TranslateService = inject(TranslateService);

  constructor() {
    this._translateService.setDefaultLang(this._userSettingService.selectedUserLanguage().id);
  }
}
