import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserDetailsProfileService} from './user-details-profile.service';
import {PersonAdapter} from '../../../people/person.adapter';
import {Person} from '../../../people/person';
import {ValueViewValue} from '../../../shared/response/value-viewValue';
import {NotificationService} from '../../../shared/notification.service';
import {ProfileService} from '../../../_services/profile.service';
import {UserDetailsProfileFormBuilder} from './user-details-profile-form-builds';
import {MetadataService} from '../../../_services/metadata.service';
import {PersonResponse} from "../../../people/person/person-response";
import {UserSessionStore} from "../../../_services/user-session-store/user-session.store";
import {Link} from "../../../shared/response/link";

@Component({
  selector: 'app-user-details-profile',
  templateUrl: './user-details-profile.component.html',
  styleUrls: ['./user-details-profile.component.scss']
})
export class UserDetailsProfileComponent implements OnInit {
  private readonly _userStore = inject(UserSessionStore);

  person!: Person;
  genders: Array<ValueViewValue> = [];
  maritalStatuses: Array<ValueViewValue> = [];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private profileService: ProfileService,
              public userDetailsProfileFormBuilder: UserDetailsProfileFormBuilder,
              private userDetailsProfileService: UserDetailsProfileService,
              private adapter: PersonAdapter,
              private metadataService: MetadataService) {
  }

  ngOnInit(): void {
    this._fetchPersonUserDetailsProfile();
  }

  public updatePerson(): void {
    if (this.person.links && this.person.links.updatePerson) {
      this.userDetailsProfileService.update(this.person.links.updatePerson.href, this.userDetailsProfileFormBuilder.getFormValue())
        .subscribe(data => {
            this.notificationService.success('Person user profile updated successfully');
          },
          error => {
            console.log('Error', error);
            this.notificationService.error('Person user profile could not be updated');
          }
        );
    }
  }

  private _fetchPersonUserDetailsProfile(): void {
    const personLink: Link | undefined = this._userStore.userProfile()?.links.person

    if (personLink) {
      this.userDetailsProfileService.getById(personLink.href)
        .then((response: PersonResponse) => {

          // get person details and populate form
          this.person = this.adapter.adapt(response._data.person, response._data.person.links, response._metadata);
          this.userDetailsProfileFormBuilder.populateForm(this.person);

          // map metadata
          this.genders = this.metadataService.resolveMetadataIdValues(response._metadata.genderId.values);
          this.maritalStatuses = this.metadataService.resolveMetadataIdValues(response._metadata.maritalStatusId.values);
        });
    } else {
      this.notificationService.error('User logged on does not have a person attached.')
    }
  }
}
