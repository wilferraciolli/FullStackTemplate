import {Injectable} from '@angular/core';
import {IdValue} from '../shared/response/id-value';
import {ValueViewValue} from '../shared/response/value-viewValue';
import {Id} from "../shared/response/id";

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
  public resolveMetadataIdValues(values: Array<IdValue>): Array<ValueViewValue> {
    return values
      .map((meta: IdValue) => (new ValueViewValue(meta.id, meta.value)));
  }

  /**
   * Helper method to get all of the ids from te metadata
   * @param values
   */
  public resolveMetadataIds(values: Array<IdValue>): Array<Id> {
    return values
      .map((meta: IdValue) => ({id: meta.id}));
  }
}
