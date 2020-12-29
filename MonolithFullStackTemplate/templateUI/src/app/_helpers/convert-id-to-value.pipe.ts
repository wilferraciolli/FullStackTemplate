import {Pipe, PipeTransform} from '@angular/core';
import {ValueViewValue} from '../shared/response/value-viewValue';

/*
 * Converts an id to a string value.
 * Usage:
 *   id | convertIdToValues:id
 * Example:
 *   {{ Id | convertIdToValues: arrayWithIdsAndValues }}
 *   formats to: 1024
*/
@Pipe({name: 'convertIdToValues'})
export class ConvertIdToStringValuePipe implements PipeTransform {

  transform(id: string, idValues: Array<ValueViewValue>): string {
    // console.log('the value to convert is ', id);
    // console.log('the values available are ', idValues);

    let convertedValue = 'Unknown value';
    idValues.forEach(i => {
      if (i.value === id) {

        convertedValue = i.viewValue;
      }
    });

    return convertedValue;

  }
}
