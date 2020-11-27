import {Component, Inject, OnInit, Optional} from '@angular/core';
import {UserServiceService} from '../user-service.service';
import {NotificationService} from '../../shared/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserAdapter} from '../user-adapter';
import {UserPayload} from '../user-payload';
import {UserFormBuilder} from '../user-form-builder';
import {ValueViewValue} from '../../shared/response/value-viewValue';
import {UserMeta} from '../user-meta';
import {User} from '../user';
import {Link} from '../../shared/response/link';
import {MetaDataWithValues} from '../../shared/response/meta-data';
import {IdValue} from '../../shared/response/id-value';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  hide = true;
  availableRoles: Array<ValueViewValue>;
  user: User;
  selfLink: Link;

  constructor(private userService: UserServiceService,
              public userFormBuilder: UserFormBuilder,
              private adapter: UserAdapter,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<UserComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    // get the link passed on
    if (data) {
      this.selfLink = data.link;
    } else {
      console.warn('no link to get single user was passed');
    }
  }

  ngOnInit(): void {
    this.getSingleUser(this.selfLink.href).then((data) => {
      this.user = this.adapter.adapt(data._data.user, data._data.user, data._metadata);
      this.availableRoles = this.userService.resolveRoleIds(this.user.meta.roleIds.values);

      this.userFormBuilder.populateForm(this.user);
    });
  }

  getSingleUser(url: string): Promise<any> {

    return this.userService.getById(url);
  }

  /**
   * Clear out form and re initialize it
   */
  onClear() {
    this.userFormBuilder.form.reset();
    this.userFormBuilder.initializeFormGroup();
    this.notificationService.success('Form cleared successfully');
  }

  onSubmit() {
    console.log('the value of the form is ', this.userFormBuilder.getFormValue());
    if (this.userFormBuilder.form.valid) {

      if (this.userFormBuilder.form.value.$key) {
        this.update();
      } else {
        this.create();
      }

      this.userFormBuilder.form.reset();
      this.userFormBuilder.initializeFormGroup();
      this.userService.reloadCurrentRoute();
      this.onClose();
    }
  }

  create() {
    console.log('Adding');

    this.userService.add('http://localhost:5001/api/users', new UserPayload(this.userFormBuilder.getFormValue()))
      .subscribe(data => {
          console.log('Success', data);
          this.notificationService.success('User created successfully');
        },
        error => {
          console.log('Error', error);
          this.notificationService.error('User could not be created');
        });
  }

  update() {
    console.log('updating');
    const updateUrl = this.userFormBuilder.form.value.links.updateUser.href;

    this.userService.update(updateUrl, new UserPayload(this.userFormBuilder.getFormValue()))
      .subscribe(data => {
          console.log('Success', data);
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
  onClose() {
    this.userFormBuilder.form.reset();
    this.userFormBuilder.initializeFormGroup();
    this.dialogRef.close();
  }
}
