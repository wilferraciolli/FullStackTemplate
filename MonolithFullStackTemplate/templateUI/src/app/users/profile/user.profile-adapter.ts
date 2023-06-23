import {UserProfileLinks} from './user.profile-links';
import {UserProfileResponse} from './user.profile.response';
import {Adapter} from '../../shared/response/adapter';
import {UserProfile} from './user.profile';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileAdapter implements Adapter<UserProfile> {
  adapt(data: any, links: any, meta?: any): UserProfile {

    // TODO
    // @ts-ignore
    return null;
  }

}
