import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from './user';
import {UserServiceService} from './user-service.service';
import * as _ from 'lodash';
import {MetadataService} from '../_services/metadata.service';
import {DateTimeService} from '../_services/date-time.service';
import {UserForm} from "./user-form";
import {Id} from "../shared/response/id";
import {EMAIL_PATTERN} from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class UserFormBuilder {
  public form: FormGroup<UserForm>;

  constructor(private formBuilder: FormBuilder,
              private userService: UserServiceService,
              private metadataService: MetadataService,
              private dateTimeService: DateTimeService) {

    this.form = this.formBuilder.group<UserForm>({
      $key: this.formBuilder.control(null),
      firstName: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      lastName: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      username: this.formBuilder.nonNullable.control('', {
        validators: [Validators.required, Validators.email]
      }),
      password: this.formBuilder.nonNullable.control('', {
        validators: [
          Validators.required,
          Validators.pattern(new RegExp(EMAIL_PATTERN))
        ]
      }),
      dateOfBirth: this.formBuilder.control(null),
      active: this.formBuilder.nonNullable.control(true),
      roleIds: this.formBuilder.array([
        this.formBuilder.group(new Id(''))
      ])
    });
  }

  public get rolesFormArray(): FormArray {
    return this.form.controls.roleIds;
  }

  get firstName(): FormControl<string> {
    return this.form.controls.firstName;
  }

  get lastName(): FormControl<string> {
    return this.form.controls.lastName;
  }

  get username(): FormControl<string> {
    return this.form.controls.username;
  }

  get password(): FormControl<string> {
    return this.form.controls.password;
  }

  get dateOfBirth(): FormControl<string | null> {
    return this.form.controls.dateOfBirth;
  }

  public getFormValue(): User {
    const user: User = new User(
      this.form.controls.$key.value,
      this.form.controls.firstName.value,
      this.form.controls.lastName.value,
      this.form.controls.username.value,
      this.form.controls.password.value,
      this.dateTimeService.parseDate(this.form.controls.dateOfBirth.value),
      this.form.controls.active.value,
      this._buildRoleIds(this.form.controls.roleIds.value),
      null,
      null
    );

    return user;
  }

  public resetFormGroup(): void {
    this.form.reset();
    this._recreateRoleIdsArrayField(1);
  }

  public populateFormValues(user: User): void {
    this.form.patchValue(
      {
        $key: _.isUndefined(user) ? null : user.id,
        firstName: _.isUndefined(user) ? '' : user.firstName,
        lastName: _.isUndefined(user) ? '' : user.lastName,
        username: _.isUndefined(user) ? '' : user.username,
        password: _.isUndefined(user) ? '' : user.password,
        dateOfBirth: _.isUndefined(user) ? '' : user.dateOfBirth,
        active: _.isUndefined(user) ? false : user.active,
        roleIds: this._buildUserRolesFormArrayField(user)
      }
    );
  }

  public addRoleFormGroup(): void {
    this.rolesFormArray.push(this.formBuilder.group(new Id('')));
  }

  public deleteRoleFormGroup(index: number): void {
    this.rolesFormArray.removeAt(index);
  }

  private _buildUserRolesFormArrayField(user: User): Id[] {
    let ids: Id[] = [];
    user.roleIds.forEach((id: string) => ids.push(new Id(id)));

    // recreate the roleIds field
    this._recreateRoleIdsArrayField(ids.length);

    return ids;
  }

  private _recreateRoleIdsArrayField(roleIdsLength: number): void {
    while (this.rolesFormArray.length !== 0) {
      this.rolesFormArray.removeAt(0);
    }

    for (let i: number = 0; i < roleIdsLength; i++) {
      this.rolesFormArray.push(this.formBuilder.group(new Id('')));
    }
  }

  private _buildRoleIds(roleFormIds: any): string[] {
    let ids: string[] = [];
    roleFormIds.forEach((id: Id) => ids.push(id.id));

    return ids;
  }
}
