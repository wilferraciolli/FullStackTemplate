import {inject, Injectable} from '@angular/core';
import {Link} from '../../shared/response/link';
import {UserProfile} from '../../_services/classes/user.profile';
import {UserSessionStore} from "../../_services/user-session-store/user-session.store";

@Injectable({providedIn: 'root'})
export class UserListResolver {
  private readonly _userStore = inject(UserSessionStore);

  public async resolveUserListLink(): Promise<Link | null> {
    const userProfile: UserProfile | null = this._userStore.userProfile();

    if (!userProfile || !userProfile.links.users) {
      return null;
    }

    return userProfile.links?.users;
  }
}
