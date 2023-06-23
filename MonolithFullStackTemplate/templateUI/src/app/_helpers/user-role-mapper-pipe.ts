import {Pipe, PipeTransform} from '@angular/core';
import {ValueViewValue} from '../shared/response/value-viewValue';

/*
 * Converts an array of ids to a string of values.
 * Usage:
 *   ids | convertIdsToValues:idsValues
 * Example:
 *   {{ arrayWithIds | convertIdsToValues: arrayWithIdsAndValues }}
 *   formats to: 1024
*/
@Pipe({name: 'convertIdsToValues'})
export class ConvertIdsToStringValuePipe implements PipeTransform {

  transform(ids: Array<string>, idValues: Array<ValueViewValue>): string {
    const values: string[] = [];

    idValues.forEach((id: ValueViewValue) => {
      if (ids.includes(id.value)) {
        values.push(id.viewValue);
      }
    });

    return values.join(', ');
  }
}
