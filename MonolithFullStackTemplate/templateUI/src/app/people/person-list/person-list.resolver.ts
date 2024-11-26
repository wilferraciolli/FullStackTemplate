import {inject, Injectable} from '@angular/core';
import {UserProfile} from '../../_services/classes/user.profile';
import {Link} from "../../shared/response/link";
import {UserSessionStore} from "../../_services/user-session-store/user-session.store";

@Injectable({providedIn: 'root'})
export class PersonListResolver {
  private readonly _userStore = inject(UserSessionStore);

  public async resolvePersonListLink(): Promise<Link | null> {
    const userProfile: UserProfile | null = this._userStore.userProfile();

    if (!userProfile || !userProfile.links.people) {
      return null;
    }

    return userProfile.links?.people;
  }
}
