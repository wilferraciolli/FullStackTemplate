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

  /**
   * Method to be called once the add dialog is closed.
   */
  onClose(): void {
    //TODO need to make sure that form is not empty
    // close the dialog and pass the form value to the requester
    this.dialogRef.close(this.personFormBuilder.getFormValue());

    this.personFormBuilder.form.reset();
    this.personFormBuilder.resetFormGroup();
  }

  /**
   * Clear out form and re initialize it
   */
  onClear(): void {
    this.personFormBuilder.form.reset();
    this.personFormBuilder.resetFormGroup();
    this.notificationService.success('Form cleared successfully');
  }

  onSubmit(): void {
    if (this.personFormBuilder.form.valid) {

      if (this.personFormBuilder.form.value.$key) {
        this.update();
      } else {
        this.create();
      }

      this.personFormBuilder.form.reset();
      this.personFormBuilder.resetFormGroup();

      //this.personService.reloadCurrentRoute(); //TODO this reloads the page and send back to home
      this.onClose();
    }
  }

  create(): void {
    console.log('Adding');

    this.personService.add(this.linkService.getCreateUrlFromTemplateUrl(this.link), this.personFormBuilder.getFormValue())
      .subscribe(data => {
          console.log('Success', data);
          this.notificationService.success('Person created successfully');
        },
        error => {
          console.log('Error', error);
          this.notificationService.error('Person could not be created');
        });
  }

  update(): void {
    console.log('updating');

    this.personService.update(this.link.href, this.personFormBuilder.getFormValue())
      .subscribe(data => {
          console.log('Success', data);
          this.notificationService.success('Person updated successfully');
        },
        error => {
          console.log('Error', error);
          this.notificationService.error('Person could not be updated');
        });
  }

  private getPersonTemplate(url: string): Promise<PersonResponse> {

    return this.personService.getTemplateAsync(url);
  }

  private getSinglePerson(url: string): Promise<any> {

    return this.personService.getById(url);
  }
}
