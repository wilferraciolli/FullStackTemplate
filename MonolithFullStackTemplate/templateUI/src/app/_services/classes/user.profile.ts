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
  meta: UserProfileMeta | null;

  constructor(id: string,
              personId: string,
              username: string,
              firstName: string,
              lastName: string,
              roleIds: string[],
              links: UserProfileLinks,
              meta: UserProfileMeta | null) {
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

export enum UserRoleType {
  GUEST = 'ROLE_GUEST',
  INTEGRATION = 'ROLE_INTEGRATION',
  ADMIN = 'ROLE_ADMIN',
  HR_ADMIN = 'ROLE_HR_ADMIN',
  USER = 'ROLE_USER'
}
