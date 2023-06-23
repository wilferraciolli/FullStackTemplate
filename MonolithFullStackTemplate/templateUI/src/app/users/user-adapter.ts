import { Injectable } from '@angular/core';
import { Adapter } from '../shared/response/adapter';
import { User } from './user';
import { UserLinks } from './user-links';

@Injectable({
  providedIn: 'root'
})
export class UserAdapter implements Adapter<User> {

  adapt(user: User, links: UserLinks , meta?: any): User {
    return new User(user.id,
      user.firstName,
      user.lastName,
      user.username,
      user.password,
      user.dateOfBirth,
      user.active,
      user.roleIds,
      new UserLinks(links.self,
        links.updateUser,
        links.deleteUser,
        links.users),
      meta);
  }

}
