import {Component, Inject, OnInit, Optional} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {NotificationService} from '../../shared/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserAdapter} from '../user-adapter';
import {UserFormBuilder} from '../user-form-builder';
import {ValueViewValue} from '../../shared/response/value-viewValue';
import {User} from '../user';
import {Link} from '../../shared/response/link';
import {UserResponse} from './user-response';
import {LinksService} from '../../_services/links-service';
import {MetadataService} from '../../_services/metadata.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public hide: boolean = true;
  public availableRoles: Array<ValueViewValue> = [];

  private link!: Link;
  private user!: User;

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
        if (this.user.meta) {
          this.availableRoles = this.metadataService.resolveMetadataIdValues(this.user.meta.roleIds.values);
        }

        this.userFormBuilder.populateFormValues(this.user);
      });
    } else {

      this.getSingleUser(this.link.href).then((data) => {
        this.user = this.adapter.adapt(data._data.user, data._data.user.links, data._metadata);
        if (this.user.meta) {
          this.availableRoles = this.metadataService.resolveMetadataIdValues(this.user.meta.roleIds.values);
        }

        this.userFormBuilder.populateFormValues(this.user);
      });
    }
  }

  public onClear(): void {
    this.userFormBuilder.form.reset();
    this.userFormBuilder.resetFormGroup();
    this.notificationService.success('Form cleared successfully');
  }

  public onSubmit(): void {
    if (this.userFormBuilder.form.valid) {

      if (this.userFormBuilder.form.value.$key) {
        this.update();
      } else {
        this.create();
      }

      this.onClose();
    }
  }

 public create(): void {
    // @ts-ignore
    this.userService.add(this.linkService.getCreateUrlFromTemplateUrl(this.link), this.userFormBuilder.getFormValue())
      .subscribe((data: User) => {
          this.user = data;
          this.notificationService.success('User created successfully');
        },
        error => {
          this.notificationService.error('User could not be created');
        });
  }

 public update(): void {
    this.userService.update(this.link.href, this.userFormBuilder.getFormValue())
      .subscribe((data: User) => {
          this.user = data;
          this.notificationService.success('User updated successfully');
        },
        error => {
          console.log('Error', error);
          this.notificationService.error('User could not be updated');
        });
  }

  public onClose(): void {
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
