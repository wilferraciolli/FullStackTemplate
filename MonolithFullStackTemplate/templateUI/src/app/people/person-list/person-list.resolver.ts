import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ProfileService} from '../../_services/profile.service';
import {UserProfile} from '../../users/profile/user.profile';
import {PeopleResponse} from './people-response';
import {PersonService} from '../person.service';
import {LoadingService} from '../../shared/components/loading/loading.service';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';

@Injectable({providedIn: 'root'})
export class PersonListResolver implements Resolve<Observable<PeopleResponse>> {

  userProfile: UserProfile;

  constructor(private profileService: ProfileService,
              private personService: PersonService,
              public loadingService: LoadingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PeopleResponse> {

    this.loadingService.loadingOn();


    this.profileService.currentUserProfile
      .subscribe(user => {
        this.userProfile = user;
      });

    const url = this.userProfile.links.people.href;
    return this.personService.getAll<PeopleResponse>(url)
      .pipe(finalize(() => this.loadingService.loadingOff()));

    // TODO not working
    // return this.profileService.currentUserProfile
    //   .pipe(flatMap((user: UserProfile) =>
    //     this.personService.getAll<PeopleResponse>(user.links.people.href)
    //       .pipe(finalize(() => this.loadingService.loadingOff()))
    //   ));
  }
}
