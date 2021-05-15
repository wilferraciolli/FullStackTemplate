import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from '../../profile/user.profile';
import { UserDetailsProfileService } from './user-details-profile.service';
import { PersonAdapter } from '../../../people/person.adapter';
import { Person } from '../../../people/person';
import { ValueViewValue } from '../../../shared/response/value-viewValue';
import { NotificationService } from '../../../shared/notification.service';
import { ProfileService } from '../../../_services/profile.service';
import { UserProfileFormBuilder } from './user-profile-form-builds';
import { UserProfileResponse } from './user-profile-response';
import { MetadataService } from '../../../_services/metadata.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userProfile: UserProfile;

  person: Person;
  genders: Array<ValueViewValue>;
  maritalStatuses: Array<ValueViewValue>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private profileService: ProfileService,
              public userProfileFormBuilder: UserProfileFormBuilder,
              private userDetailsProfileService: UserDetailsProfileService,
              private adapter: PersonAdapter,
              private metadataService: MetadataService) {
  }

  ngOnInit(): void {

    this.profileService.currentUserProfile
      .subscribe(user => {
        this.userProfile = user;
      });

    this.userDetailsProfileService.getById(this.userProfile.links.person.href)
      .then((response: UserProfileResponse) => {

        // get person details and populate form
        this.person = this.adapter.adapt(response._data.person, response._data.person.links, response._metadata);
        this.userProfileFormBuilder.populateForm(this.person);

        // map metadata
        this.genders = this.metadataService.resolveMetadataIdValues(response._metadata.genderId.values);
        this.maritalStatuses = this.metadataService.resolveMetadataIdValues(response._metadata.maritalStatusId.values);
      });
  }

  updatePerson(): void {
    console.log('Updating person');

    this.userDetailsProfileService.update(this.person.links.updatePerson.href, this.userProfileFormBuilder.getFormValue())
      .subscribe(data => {
          console.log('success ', data);
          this.notificationService.success('Person updated successfully');
        },
        error => {
          console.log('Error', error);
          this.notificationService.error('Person could not be updated');
        }
      );
  }
}
