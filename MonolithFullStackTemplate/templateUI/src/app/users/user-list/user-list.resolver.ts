import {inject, Injectable} from '@angular/core';
import {Link} from '../../shared/response/link';
import {ProfileService} from '../../_services/profile.service';
import {UserProfile} from '../profile/user.profile';
import {firstValueFrom} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserListResolver {

  private readonly profileService: ProfileService = inject(ProfileService);

  public async resolveUserListLink(): Promise<Link | null> {
    const userProfile: UserProfile | null = await firstValueFrom(this.profileService.currentUserProfile)
      .then((userProfile: UserProfile) => userProfile);
    //
    // const userProfile: UserProfile | undefined = await this.profileService.currentUserProfile
    //   .pipe(first()).toPromise()

    if (!userProfile) {
      return null;
    }

    return userProfile.links?.users;
  }
}
