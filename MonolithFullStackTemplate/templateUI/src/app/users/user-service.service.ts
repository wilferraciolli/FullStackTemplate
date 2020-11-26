import {Injectable} from '@angular/core';
import {HttpBaseService} from '../shared/response/base-service';
import {ValueViewValue} from '../shared/response/value-viewValue';
import {MetaDataWithValues} from '../shared/response/meta-data';
import {IdValue} from '../shared/response/id-value';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService extends HttpBaseService {

  resolveUserRoles(values: any): Array<ValueViewValue> {
    //TODO remove it
    console.log('value extracted is ', values);

    return values
      .map(v => v.roleIds.values
        .map(meta => ({value: meta.id, viewValue: meta.value})))[0];
  }

  resolveRoleIds(values: Array<IdValue>): Array<ValueViewValue> {

    return values
      .map(meta => (new ValueViewValue(meta.id, meta.value)));
  }
}
