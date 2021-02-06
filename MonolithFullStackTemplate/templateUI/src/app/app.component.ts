import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'templateUI';

  constructor(private translate: TranslateService) {

    // TODO load default language from user preferences
    translate.setDefaultLang('en');
  }

  /**
   * Set the language to be used.
   * @param language the language id to be used
   */
  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
