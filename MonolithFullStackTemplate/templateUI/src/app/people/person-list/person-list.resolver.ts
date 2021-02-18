import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Link} from '../../shared/response/link';
import {PersonService} from '../person.service';
import {ProfileService} from '../../_services/profile.service';
import {UserProfile} from '../../users/profile/user.profile';

@Injectable({providedIn: 'root'})
export class PersonListResolver implements Resolve<Link> {

  userProfile: UserProfile;

  constructor(private service: PersonService,
              private profileService: ProfileService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Link {

    this.profileService.currentUserProfile
      .subscribe(user => {
        this.userProfile = user;
      });

    console.log('running the resolver ', route.data);
    return this.userProfile.links.people;
  }
}
