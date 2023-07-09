import {UserProfileLinks} from './user.profile-links';
import {UserProfileMeta, UserProfileResponse} from './user.profile.response';
import {Adapter} from '../../../shared/response/adapter';
import {UserProfile} from './user.profile';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileAdapter implements Adapter<UserProfile> {
  adapt(data: UserProfile, links: UserProfileLinks, meta?: UserProfileMeta): UserProfile {
    return new UserProfile(
      data.id,
      data.personId,
      data.username,
      data.firstName,
      data.lastName,
      data.roleIds,
      links,
    );
  }
  // constructor(data: UserProfileResponse) {
  //   this.id = data._data.userProfile.id;
  //   this.personId = data._data.userProfile.personId;
  //   this.firstName = data._data.userProfile.firstName;
  //   this.lastName = data._data.userProfile.lastName;
  //   this.links = data._data.userProfile.links;
  // }
}
