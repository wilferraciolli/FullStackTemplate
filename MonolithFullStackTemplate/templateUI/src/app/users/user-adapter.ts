import {Injectable} from '@angular/core';
import {Adapter} from '../shared/response/adapter';
import {User} from './user';
import {UserLinks} from './user-links';
import {UserMeta} from "./user-meta";

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {

  adapt(user: User, links: UserLinks | null, meta: any): User {
    return new User(user.id,
      user.firstName,
      user.lastName,
      user.username,
      user.password,
      user.dateOfBirth,
      user.active,
      user.roleIds,
      links,
      meta);
  }

}
