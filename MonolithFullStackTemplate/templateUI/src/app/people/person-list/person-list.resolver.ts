import {inject, Injectable} from '@angular/core';
import {ProfileService} from '../../_services/profile.service';
import {UserProfile} from '../../users/profile/user.profile';
import {firstValueFrom} from 'rxjs';
import {Link} from "../../shared/response/link";

@Injectable({providedIn: 'root'})
export class PersonListResolver {

  private readonly profileService: ProfileService = inject(ProfileService);

  public async resolvePersonListLink(): Promise<Link | null> {
    const userProfile: UserProfile | null = await firstValueFrom(this.profileService.currentUserProfile);

    if (!userProfile) {
      return null;
    }

    return userProfile.links?.people;
  }
}
