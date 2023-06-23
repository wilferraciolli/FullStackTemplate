import {Component, OnInit} from '@angular/core';
import {ValueViewValue} from '../../../shared/response/value-viewValue';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  availableLocale: Array<ValueViewValue> = [];
  availableLanguages: Array<ValueViewValue> = [];

  constructor() {
  }

  ngOnInit(): void {
    this.availableLocale.push(new ValueViewValue('UTC', 'Utc'));
    this.availableLanguages.push(new ValueViewValue('en-gb', 'English UK'));
  }

}
