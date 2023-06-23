import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProfileService} from '../../_services/profile.service';
import {UserProfile} from '../../users/profile/user.profile';
import {PeopleResponse} from './people-response';
import {PersonService} from '../person.service';
import {LoadingService} from '../../shared/components/loading/loading.service';
import {finalize} from 'rxjs/operators';
import {firstValueFrom, Observable} from 'rxjs';
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
