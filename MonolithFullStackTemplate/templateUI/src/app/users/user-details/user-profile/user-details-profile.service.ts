import {Injectable} from '@angular/core';
import {HttpBaseService} from '../../../shared/response/base-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../../people/person';
import {IdValue} from '../../../shared/response/id-value';
import {ValueViewValue} from '../../../shared/response/value-viewValue';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsProfileService extends HttpBaseService {

  resolveGenderIds(values: Array<IdValue>): Array<ValueViewValue> {

    return values
      .map(meta => (new ValueViewValue(meta.id, meta.value)));
  }
}
