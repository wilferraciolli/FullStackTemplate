import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Link} from '../../shared/response/link';
import {ProfileService} from '../../_services/profile.service';
import {UserProfile} from '../../users/profile/user.profile';

@Injectable({providedIn: 'root'})
export class UserListResolver implements Resolve<Link> {

  userProfile: UserProfile;

  constructor(private profileService: ProfileService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Link {

    this.profileService.currentUserProfile
      .subscribe(user => {
        this.userProfile = user;
      });

    return this.userProfile.links.users;
  }
}
