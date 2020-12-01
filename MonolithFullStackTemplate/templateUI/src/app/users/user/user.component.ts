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

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  hide = true;
  availableRoles: Array<ValueViewValue>;
  user: User;
  link: Link;

  constructor(private userService: UserServiceService,
              public userFormBuilder: UserFormBuilder,
              private adapter: UserAdapter,
              private notificationService: NotificationService,
              private linkService: LinksService,
              public dialogRef: MatDialogRef<UserComponent>,
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
        this.user =  this.adapter.adapt(data._data.user, data._data.user.links, data._metadata);
        this.availableRoles = this.userService.resolveRoleIds(this.user.meta.roleIds.values);

        this.userFormBuilder.initializeFormGroupWithTemplateValues(this.user);
      });
    } else {

      this.getSingleUser(this.link.href).then((data) => {
        this.user = this.adapter.adapt(data._data.user, data._data.user.links, data._metadata);
        this.availableRoles = this.userService.resolveRoleIds(this.user.meta.roleIds.values);

        this.userFormBuilder.populateForm(this.user);
      });
    }
  }

  /**
   * Clear out form and re initialize it
   */
  onClear(): void {
    this.userFormBuilder.form.reset();
    this.userFormBuilder.initializeFormGroup();
    this.notificationService.success('Form cleared successfully');
  }

  onSubmit(): void {
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

  create(): void {
    console.log('Adding');

    this.userService.add(this.linkService.getCreateUrlFromTemplateUrl(this.link), this.userFormBuilder.getFormValue())
      .subscribe(data => {
          console.log('Success', data);
          this.notificationService.success('User created successfully');
        },
        error => {
          console.log('Error', error);
          this.notificationService.error('User could not be created');
        });
  }

  update(): void {
    console.log('updating');
    // const updateUrl = this.userFormBuilder.form.value.links.updateUser.href;

    this.userService.update(this.link.href, this.userFormBuilder.getFormValue())
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
  onClose(): void {
    this.userFormBuilder.form.reset();
    this.userFormBuilder.initializeFormGroup();
    this.dialogRef.close();
  }

  // private getUserTemplate(href: string): User {
  //   let userTemplate;
  //   this.userService.getTemplate(href)
  //     .subscribe((response: UserResponse) => {
  //       console.log('The response is ', response);
  //       userTemplate = this.adapter.adapt(response._data.user, response._data.user.links, response._metadata);
  //     });
  //
  //   return userTemplate;
  // }

  private getUserTemplate(url: string): Promise<UserResponse> {

    return this.userService.getTemplateAsync(url);
  }

  getSingleUser(url: string): Promise<any> {

    return this.userService.getById(url);
  }
}
