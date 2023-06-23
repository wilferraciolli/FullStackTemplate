import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocaleType} from "./shared/locale.enum";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'templateUI';

  constructor(private translate: TranslateService) {
    const usersChosenLanguage: string | null = this.resolveUsersLanguage();

    if (usersChosenLanguage) {
      translate.setDefaultLang(usersChosenLanguage);
    } else {
      translate.setDefaultLang(LocaleType.ENGLISH);
    }
  }

  private resolveUsersLanguage(): string | null {
    // TODO load default language from user preferences
    return localStorage.getItem('templateUI-chosenLanguage');
  }
}
