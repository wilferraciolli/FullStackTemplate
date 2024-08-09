import { DatePipe } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  private _DEFAULT_TIMEZONE: string = 'Europe/London';
  private _CYPRUS_TIMEZONE: string = 'Asia/Nicosia';
  private _UTC_TIMEZONE: string = 'UTC';
  private _DATE_FORMAT: string = 'yyyy-MM-dd';

  private _dateTime: DatePipe = inject(DatePipe);

  constructor() {
  }

  /**
   * Formats a date string onto ISO date.
   * @param date The date to format.
   */
  public parseDate(date: string | null): string | null {
    if (date) {
      return this._dateTime.transform(date, this._DATE_FORMAT);
    }

    return null;
  }

  /**
   * Parse a date time UTC YYYY-MM-DDThh:mm:ssZ into a timezone free string in the format of YYYY-MM-DDThh:mm.
   * @param dateTimeInUtc date and time in the format YYYY-MM-DDThh:mm:ssZ
   * @param timeZone the desired timezone, Eg 'Europe/London'
   * Return a string with the date and time parsed as time zone free in the format as YYYY-MM-DDThh:mm.
   */
  public parseUTCDateTimeToTimezone(dateTimeInUtc: string, timeZone: string): string {
    const dt = DateTime.fromISO(dateTimeInUtc, { zone: 'utc' });
    const dtInTimeZone = dt.setZone(timeZone);

    const year: number = dtInTimeZone.year;
    const month: string = dtInTimeZone.month.toString().padStart(2, '0');
    const day: string = dtInTimeZone.day.toString().padStart(2, '0');
    const hour: string = dtInTimeZone.hour.toString().padStart(2, '0');
    const minute: string = dtInTimeZone.minute.toString().padStart(2, '0');

    const formattedString: string = `${ year }-${ month }-${ day }T${ hour }:${ minute }`;
    return formattedString;
  }

  /**
   * Converts a date and time string onto a date and time UTC value based on a timezone
    * @param dateTime The date and time on correct format (YYYY-MM-DDThh:mm)
   * @param timeZone The time zone used to select the value above
   * @returns An UTC string representation  (YYYY-MM-DDThh:mm:ssZ) of the date and time chosen based on a give timezone
   */
  public parseDateTimeFromTimezoneToUTC(dateTime: string, timeZone: string): string {
    const dateParts: string[] = dateTime.split(/[-T]/); // get the date values and add time values to the end
    const year: number = parseInt(dateParts[0], 10);
    const month: number = parseInt(dateParts[1], 10) - 1; // months are zero-based
    const day: number = parseInt(dateParts[2], 10);

    const timeParts: string[] = dateParts[3].split(':'); // get the time value from the date values and split onto minute and secs
    const hour: number = parseInt(timeParts[0], 10);
    const minute: number = parseInt(timeParts[1], 10);

    // create a date from the input
    const date = new Date(
      Date.UTC(year, month, day, hour, minute, 0, 0) // 0 for seconds and milliseconds
    );

    // work out the offset, ideally we already know the timezone so we should be able to just get the offset from it
    let utcDate: Date = new Date(date.toLocaleString('en-gb', { timeZone: 'UTC' }));
    let tzDate: Date = new Date(date.toLocaleString('en-gb', { timeZone: timeZone }));
    let offset: number = utcDate.getTime() - tzDate.getTime();
    date.setTime(date.getTime() + offset);

    console.log('Converting to ISO ', date);
    const utcString: string = date.toISOString();

    return utcString.replace('.000Z', 'Z');
  }

  public resolveUsersTimezone(): string {
    let timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timeZone) {
      return timeZone;
    }

    return this._DEFAULT_TIMEZONE;
  }
}
