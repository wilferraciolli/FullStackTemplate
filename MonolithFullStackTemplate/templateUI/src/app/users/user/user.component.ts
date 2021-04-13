import {Component, Inject, OnInit, Optional} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {NotificationService} from '../../shared/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserAdapter} from '../user-adapter';
import {UserPayload} from '../user-payload';
import {UserFormBuilder} from '../user-form-builder';
import {ValueViewValue} from '../../shared/response/value-viewValue';
import {User} from '../user';
import {Link} from '../../shared/response/link';
import {UserResponse} from './user-response';
import {LinksService} from '../../_services/links-service';
import {MetadataService} from '../../_services/metadata.service';
import {DateTimeService} from '../../_services/date-time.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  hide = true;
  link: Link;
  user: User;
  availableRoles: Array<ValueViewValue>;

  constructor(private userService: UserServiceService,
              public userFormBuilder: UserFormBuilder,
              private adapter: UserAdapter,
              private notificationService: NotificationService,
              private linkService: LinksService,
              public dialogRef: MatDialogRef<UserComponent>,
              private metadataService: MetadataService,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    // get the link passed on
    if (data) {
      this.link = data.link;
    } else {
      console.warn('no link to get single user was passed');
    }
  }

  ngOnInit(): void {
    if (this.linkService.isTemplateLink(this.link)) {
      this.getUserTemplate(this.link.href).then((data: UserResponse) => {
        this.user = this.adapter.adapt(data._data.user, data._data.user.links, data._metadata);
        this.availableRoles = this.metadataService.resolveMetadataIdValues(this.user.meta.roleIds.values);

        this.userFormBuilder.initializeFormGroupWithTemplateValues(this.user);
      });
    } else {

      this.getSingleUser(this.link.href).then((data) => {
        this.user = this.adapter.adapt(data._data.user, data._data.user.links, data._metadata);
        this.availableRoles = this.metadataService.resolveMetadataIdValues(this.user.meta.roleIds.values);

        this.userFormBuilder.populateForm(this.user);
      });
    }
  }

  /**
   * Clear out form and re initialize it
   */
  onClear(): void {
    this.userFormBuilder.form.reset();
    this.userFormBuilder.resetFormGroup();
    this.notificationService.success('Form cleared successfully');
  }

  onSubmit(): void {
    if (this.userFormBuilder.form.valid) {

      if (this.userFormBuilder.form.value.$key) {
        this.update();
      } else {
        this.create();
      }

      this.onClose();
    }
  }

  create(): void {
    this.userService.add(this.linkService.getCreateUrlFromTemplateUrl(this.link), this.userFormBuilder.getFormValue())
      .subscribe((data: User) => {
          console.log('Success', data);
          this.user = data;
          this.notificationService.success('User created successfully');
        },
        error => {
          console.log('error send from creating duplicated user', error);
          this.notificationService.error('User could not be created');
        });
  }

  update(): void {
    console.log('updating');

    this.userService.update(this.link.href, this.userFormBuilder.getFormValue())
      .subscribe((data: User) => {
          console.log('Success', data);
          this.user = data;
          this.notificationService.success('User updated successfully');
        },
        error => {
          console.log('Error', error);
          this.notificationService.error('User could not be updated');
        });
  }

  /**
   * Method to be called once the add dialog is closed.
   */
  onClose(): void {
    // pass returned data to the caller
    this.dialogRef.close(this.user);

    this.userFormBuilder.form.reset();
    this.userFormBuilder.resetFormGroup();
  }

  private getUserTemplate(url: string): Promise<UserResponse> {

    return this.userService.getTemplateAsync(url);
  }

  private getSingleUser(url: string): Promise<any> {

    return this.userService.getById(url);
  }
}
