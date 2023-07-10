import {UserProfileLinks} from './user.profile-links';
import {UserProfileMeta} from "./user.profile.response";

export class UserProfile {
  id: string;
  personId: string;
  username: string;
  firstName: string;
  lastName: string;
  roleIds: string[];
  links: UserProfileLinks;
  meta: UserProfileMeta;

  constructor(id: string,
              personId: string,
              username: string,
              firstName: string,
              lastName: string,
              roleIds: string[],
              links: UserProfileLinks,
              meta: UserProfileMeta) {
    this.id = id;
    this.personId = personId;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleIds = roleIds;
    this.links = links;
    this.meta = meta;
  }
}
