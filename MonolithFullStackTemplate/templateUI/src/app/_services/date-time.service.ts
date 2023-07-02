import {Injectable} from '@angular/core';
import {Link} from '../shared/response/link';
import * as _ from 'lodash';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor(private dateTime: DatePipe) {
  }

  /**
   * Formats a date string onto ISO date.
   * @param The date to format.
   */
  public parseDate(date: string | null): string | null {
    if (date) {
      return this.dateTime.transform(date, 'yyyy-MM-dd');
    }

    return null;
  }

  /**
   * Formats a date-time string onto ISO date.
   * @param The date-time to format.
   */
  public parseDateTime(date: string): string | null {
    return this.dateTime.transform(date, 'yyyy-MM-dd T HH:mm:ss');
  }

}
