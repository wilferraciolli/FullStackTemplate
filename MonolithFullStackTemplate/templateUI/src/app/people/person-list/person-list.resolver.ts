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

  constructor(private profileService: ProfileService,
              private personService: PersonService,
              public loadingService: LoadingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PeopleResponse> {

    this.loadingService.loadingOn();

    return this.profileService.currentUserProfile
      .pipe(flatMap((user: UserProfile) =>
        this.personService.getAll<PeopleResponse>(user.links.people.href)
          .pipe(finalize(() => this.loadingService.loadingOff()))
      ));
  }
}
