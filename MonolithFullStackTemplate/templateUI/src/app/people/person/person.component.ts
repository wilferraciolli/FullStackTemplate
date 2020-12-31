import {Component, Inject, OnInit, Optional} from '@angular/core';
import {PersonService} from '../person.service';
import {PersonAdapter} from '../person.adapter';
import {NotificationService} from '../../shared/notification.service';
import {LinksService} from '../../_services/links-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MetadataService} from '../../_services/metadata.service';
import {Link} from '../../shared/response/link';
import {Person} from '../person';
import {PersonFormBuilder} from '../person-form-builder';
import {PersonResponse} from './person-response';
import {ValueViewValue} from '../../shared/response/value-viewValue';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  link: Link;
  person: Person;
  availableGenders: Array<ValueViewValue>;
  availableMaritalStatuses: Array<ValueViewValue>;

  constructor(private personService: PersonService,
              public personFormBuilder: PersonFormBuilder,
              private adapter: PersonAdapter,
              private notificationService: NotificationService,
              private linkService: LinksService,
              public dialogRef: MatDialogRef<PersonComponent>,
              private metadataService: MetadataService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    // get the link passed on
    if (data) {
      this.link = data.link;
    } else {
      console.warn('no link to get single person was passed');
    }
  }

  ngOnInit(): void {
    if (this.linkService.isTemplateLink(this.link)) {
      this.getPersonTemplate(this.link.href).then((data: PersonResponse) => {
        this.person = this.adapter.adapt(data._data.person, data._data.person.links, data._metadata);
        this.availableGenders = this.metadataService.resolveMetadataIdValues(this.person.meta.genderId.values);
        this.availableMaritalStatuses = this.metadataService.resolveMetadataIdValues(this.person.meta.maritalStatusId.values);

        this.personFormBuilder.initializeFormGroupWithTemplateValues(this.person);
      });
    } else {

      this.getSinglePerson(this.link.href).then((data) => {
        this.person = this.adapter.adapt(data._data.person, data._data.person.links, data._metadata);
        this.availableGenders = this.metadataService.resolveMetadataIdValues(this.person.meta.genderId.values);
        this.availableMaritalStatuses = this.metadataService.resolveMetadataIdValues(this.person.meta.maritalStatusId.values);

        this.personFormBuilder.populateForm(this.person);
      });
    }
  }

  private getPersonTemplate(url: string): Promise<PersonResponse> {

    return this.personService.getTemplateAsync(url);
  }

  private getSinglePerson(url: string): Promise<any> {

    return this.personService.getById(url);
  }

}
