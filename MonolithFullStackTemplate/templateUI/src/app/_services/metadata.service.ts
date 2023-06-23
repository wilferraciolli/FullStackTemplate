import {Injectable} from '@angular/core';
import {Link} from '../shared/response/link';
import * as _ from 'lodash';
import {IdValue} from '../shared/response/id-value';
import {ValueViewValue} from '../shared/response/value-viewValue';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor() {
  }

  /**
   * Helper method to get a list of id and values pair from the metadata.
   * @param values The metadata.
   */
  resolveMetadataIdValues(values: Array<IdValue>): Array<ValueViewValue> {
    return values
      .map(meta => (new ValueViewValue(meta.id, meta.value)));
  }

}
