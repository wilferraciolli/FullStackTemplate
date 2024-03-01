import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

export enum UtcToLocalTimeFormat {
  FULL = 'full',        // 'EEEE, MMMM d, y, h:mm:ss a zzzz'   - Monday, June 15, 2015 at 9:03:01 AM GMT+01:00
  SHORT = 'short',       // 'd/M/yy, h:mm'                      - 15/6/15, 9:03
  SHORT_DATE = 'shortDate',   // 'd/M/yy'                            - 15/6/15
  SHORT_TIME = 'shortTime',   // 'h:mm'                              - 9:03
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  public timeNow: string = this.convertUtcToLocalTime('2024-01-01T09:00:00.00Z', UtcToLocalTimeFormat.SHORT);
  public timeInUTC: string = this.convertLocalTimeToUtc(new Date('2020-04-13T00:00:00.000+08:00').toString());
  public timeInUTCTest: string = this.convertLocalTimeToISO(new Date('2020-04-13T00:00:00').toString());
  public timeInUK: string = '';
  public timeInUKBST: string = '';
  public timeInCY: string = '';
  public timeInCYBST: string = '';
  public timeInBR: string = '';

  constructor() {
  }

  ngOnInit(): void {
    // Getting UTC and setting onto a timezone API2UI
    this.timeInUK = new Date('2024-01-01T23:00:00.00Z').toLocaleString('en-gb', { timeZone: 'Europe/London' });
    this.timeInUKBST = new Date('2024-05-01T23:00:00.00Z').toLocaleString('en-gb', { timeZone: 'Europe/London' });
    this.timeInCY = new Date('2024-01-01T23:00:00.00Z').toLocaleString('el', { timeZone: 'Europe/Athens' });
    this.timeInCYBST = new Date('2024-05-01T23:00:00.00Z').toLocaleString('el', { timeZone: 'Europe/Athens' });
    this.timeInBR = new Date('2024-01-01T23:00:00.00Z').toLocaleString('pt-br', { timeZone: 'America/Sao_Paulo' });
  }

  public convertUtcToLocalTime(
    utcDate: string,    // UTC ISO-8601
    format: UtcToLocalTimeFormat = UtcToLocalTimeFormat.FULL
  ): string {

    // get the language of the browser
    var browserLanguage = navigator.language;
    console.log('browser language ', browserLanguage);

    if (format === UtcToLocalTimeFormat.SHORT) {
      let date = new Date(utcDate).toLocaleDateString(browserLanguage);
      let time = new Date(utcDate).toLocaleTimeString(browserLanguage);

      return `${ date }, ${ time }`;
    } else if (format === UtcToLocalTimeFormat.SHORT_DATE) {
      return new Date(utcDate).toLocaleDateString(browserLanguage);
    } else if (format === UtcToLocalTimeFormat.SHORT_TIME) {
      return new Date(utcDate).toLocaleTimeString(browserLanguage);
    } else if (format === UtcToLocalTimeFormat.FULL) {
      return new Date(utcDate).toString();
    } else {
      console.error(
        `Do not have logic to format utc date, format:${ format }`
      );
      return new Date(utcDate).toString();
    }
  }

  public convertLocalTimeToUtc(localDate: string): string {
    var date = new Date(localDate);

    return date.toUTCString();
  }

  public convertLocalTimeToISO(localDate: string): string {
    var date = new Date(localDate);
    console.log('date.toISOString() ', date.toISOString());
    console.log('date.() ', date.getTimezoneOffset());

    return date.toISOString();
  }

}
