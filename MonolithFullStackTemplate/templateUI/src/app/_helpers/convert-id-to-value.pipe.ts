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

  transform(id: string | undefined, idValues: Array<ValueViewValue>): string {
    let convertedValue: string = '';
    idValues.forEach((viewValue: ValueViewValue) => {
      if (viewValue.value === id) {

        convertedValue = viewValue.viewValue;
      }
    });

    return convertedValue;

  }
}
