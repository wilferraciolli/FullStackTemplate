import {HttpClient} from '@angular/common/http';
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
  public selectedFile: File | null = null;

  // this does not work as it will fail with a 403 error
  // public imageUrl: WritableSignal<string> = signal('https://picsum.photos/200/300');
  // public canUpdatePersonPhoto: boolean = false;
  // public hasPersonPhoto: boolean = false;
  public availableGenders: Array<ValueViewValue> = [];
  public availableMaritalStatuses: Array<ValueViewValue> = [];

  private link!: Link;
  public person: Person | null = null;

  constructor(private personService: PersonService,
              public personFormBuilder: PersonFormBuilder,
              public httpClient: HttpClient,
              private adapter: PersonAdapter,
              private notificationService: NotificationService,
              private linkService: LinksService,
              public dialogRef: MatDialogRef<PersonComponent>,
              private metadataService: MetadataService,
              private http: HttpClient,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {


    // get the link passed on
    if (data) {
      this.link = data.link;
    } else {
      console.warn('no link to get single person was passed');
    }
  }

  ngOnInit(): void {
    this._getSinglePerson(this.link.href).then((person: PersonResponse): void => {
      this.person = this.adapter.adapt(person._data.person, person._data.person.links, person._metadata);

      // this.hasPersonPhoto = this.person.imageId !== null;
      // this.canUpdatePersonPhoto = this.person.links?.createUpdatePersonPhoto !== undefined;
      // if (this.hasPersonPhoto && this.person.links?.downloadPersonPhoto) {
      //   this.imageUrl.set(this.person.links?.downloadPersonPhoto?.href);
      // }

      if (this.person.meta) {
        this.availableGenders = this.metadataService.resolveMetadataIdValues(this.person.meta.genderId.values);
        this.availableMaritalStatuses = this.metadataService.resolveMetadataIdValues(this.person.meta.maritalStatusId.values);
      }

      this.personFormBuilder.populateForm(this.person);
    });
  }

  /**
   * Method to be called once the add dialog is closed.
   */
  onClose(): void {
    this.dialogRef.close(this.personFormBuilder.getFormValue());

    this.personFormBuilder.form.reset();
    this.personFormBuilder.resetFormGroup();
  }

  public onClear(): void {
    this.personFormBuilder.form.reset();
    this.personFormBuilder.resetFormGroup();
    this.notificationService.success('Form cleared successfully');
  }

  public onSubmit(): void {
    if (this.personFormBuilder.form.valid) {
      this._update();

      this.personFormBuilder.form.reset();
      this.personFormBuilder.resetFormGroup();

      this.onClose();
    }
  }

  public onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;

    console.log('button clicked')

  }

  private _update(): void {
    this.personService.update(this.link.href, this.personFormBuilder.getFormValue())
      .subscribe((personUpdated: Person): void => {
          this.notificationService.success('Person updated successfully');
        },
        (error: string): void => {
          console.log('Error', error);
          this.notificationService.error('Person could not be updated');
        });
  }

  private _getSinglePerson(url: string): Promise<PersonResponse> {
    return this.personService.getById(url);
  }

}
