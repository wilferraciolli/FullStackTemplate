import { UserLinks } from './user-links';
import * as _ from 'lodash';
import { UserMeta } from './user-meta';

export class User {
  id: string | null;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  dateOfBirth: string | null;
  active: boolean | null;
  roleIds: Array<string>;
  links: UserLinks | null;
  meta: UserMeta | null;

  constructor(id: string | null,
              firstName: string,
              lastName: string,
              username: string,
              password: string,
              dateOfBirth: string | null,
              active: boolean | null,
              roleIds: Array<string>,
              links: UserLinks | null,
              meta: UserMeta | null) {

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.active = active;
    this.roleIds = this.resolveUserRoleIds(roleIds);
    this.links = links;
    this.meta = meta;
  }

  /**
   * Resolves the roleIds. If roleIds are null, instantiate, otherwise return its original value.
   * @param roleIds The roleIds
   */
  private resolveUserRoleIds(roleIds: Array<string>): Array<string> {
    return _.isNull(roleIds) ? [] : roleIds;
  }
}
