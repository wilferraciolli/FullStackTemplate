import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Link} from '../../shared/response/link';
import {ProfileService} from '../../_services/profile.service';
import {UserProfile} from '../profile/user.profile';
import {UserListResponse} from "./user-list-response";
import {finalize, first, map} from "rxjs/operators";
import {LoadingService} from "../../shared/components/loading/loading.service";
import {UserServiceService} from "../user-service.service";
import {firstValueFrom, lastValueFrom, Observable, observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserListResolver {

  private readonly profileService: ProfileService = inject(ProfileService);

  public async resolveUserListLink(): Promise<Link | null> {
    const userProfile: UserProfile | null = await firstValueFrom(this.profileService.currentUserProfile);

    if (!userProfile) {
      return null;
    }

    return userProfile.links?.users;
  }
}
