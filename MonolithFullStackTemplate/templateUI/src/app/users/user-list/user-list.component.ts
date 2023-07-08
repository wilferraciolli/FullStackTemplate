import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {User} from '../user';
import {UserServiceService} from '../user-service.service';
import {UserListResponse} from './user-list-response';
import {UserAdapter} from '../user-adapter';
import {ValueViewValue} from '../../shared/response/value-viewValue';
import {UserLinksCollection} from '../user-links-collection';
import {UserMeta} from '../user-meta';
import {LinksService} from '../../_services/links-service';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../../shared/notification.service';
import {DialogService} from '../../shared/dialog.service';
import {UserComponent} from '../user/user.component';
import {UserFormBuilder} from '../user-form-builder';
import {Link} from '../../shared/response/link';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {LoadingService} from '../../shared/components/loading/loading.service';
import {finalize} from 'rxjs/operators';
import {MetadataService} from '../../_services/metadata.service';
import {Person} from "../../people/person";
import * as _ from "lodash";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input()
  public userListLink: Link | null = null;

  searchKey!: string;
  users: Array<User> = [];
  user!: User;

  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  userTemplateLink!: Link;
  userCollectionLinks!: UserLinksCollection;
  userCollectionMeta!: UserMeta;

  userCreateAccess: boolean = false;
  userCollectionRoleIds: Array<ValueViewValue> = [];

  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);

  constructor(private breakpointObserver: BreakpointObserver,
              private activatedRoute: ActivatedRoute,
              private userService: UserServiceService,
              private userFormBuilder: UserFormBuilder,
              private adapter: UserAdapter,
              private linksService: LinksService,
              private notificationService: NotificationService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              public loadingService: LoadingService,
              private metadataService: MetadataService) {
  }

  ngOnInit(): void {
    console.log('Received users link ', this.userListLink);
    if (this.userListLink) {
      this.loadAll(this.userListLink.href);
    }else {
      this.router.navigate(['/home']);
    }
  }

  public disableUpdateUser(user: User): boolean {
    return _.isNull(user.links)
      || _.isNull(user.links.updateUser);
  }

  onSearchClear(): void {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): void {
    // this.users.filter = this.searchKey.trim().toLowerCase();
  }

  getFilterColumnsToSearchForPredicate() {
    // TODO implement search
    return null;
  }

  create(): void {
    const signInDialogRef = this.dialog.open(UserComponent, {
      width: '50%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      autoFocus: true,
      disableClose: true,
      data: {link: this.userCollectionLinks.createUser}
    });

    // subscribe to screen size
    const smallDialogSubscription = this.isExtraSmall.subscribe(result => {
      if (result.matches) {
        signInDialogRef.updateSize('100%', '100%');
      } else {
        signInDialogRef.updateSize('75%', '75%');
      }
    });
    signInDialogRef.afterClosed().subscribe(result => {
      console.log('The value returned from the dialog ', result);

      this.userService.reloadCurrentRoute();
      smallDialogSubscription.unsubscribe();
    });
  }

  onEdit(row: User): void {
    const signInDialogRef = this.dialog.open(UserComponent, {
      width: '50%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      autoFocus: true,
      disableClose: true,
      // @ts-ignore
      data: {link: row.links.self}
    });

    // subscribe to screen size
    const smallDialogSubscription = this.isExtraSmall.subscribe(result => {
      if (result.matches) {
        signInDialogRef.updateSize('100%', '100%');
      } else {
        signInDialogRef.updateSize('75%', '75%');
      }
    });
    signInDialogRef.afterClosed().subscribe(result => {

      console.log('The value returned from the dialog ', result);
      // TODO not working reload
      this.userService.reloadCurrentRoute();

      smallDialogSubscription.unsubscribe();
    });
  }

  delete(url: string): void {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this user?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.userService.delete(url)
          .subscribe(data => {
              console.log('Success', data);
              this.notificationService.warn('User deleted successfully');
              this.userService.reloadCurrentRoute();
            },
            error => {
              console.log('Error', error);
              this.notificationService.error('User could not be deleted');
            });
      }
    });
  }

  private _buildUsers(response: UserListResponse): void {
    this.loadingService.loadingOn();

    const collectionData = response._data;
    const collectionMeta: any = response._metadata;
    const metaLinks: any = response._metaLinks;

    this.userTemplateLink = metaLinks.createUser;

    this.userCollectionMeta = this.resolveCollectionMeta(collectionMeta);
    this.userCollectionLinks = this.resolveCollectionLinks(metaLinks);
    this.userCreateAccess = this.linksService.hasLink(this.userCollectionLinks.createUser);
    this.userCollectionRoleIds = this.metadataService.resolveMetadataIdValues(this.userCollectionMeta.roleIds.values);

    this.assignUsers(collectionData.user);

    this.loadingService.loadingOff();
  }

  private loadAll(url: string): void {
    this.loadingService.loadingOn();

    this.userService.getAll<UserListResponse>(url)
      .pipe(finalize(() => this.loadingService.loadingOff()))
      .subscribe((response: UserListResponse) => {
        const collectionData = response._data;
        const collectionMeta: any = response._metadata;
        const metaLinks: any = response._metaLinks;

        this.userTemplateLink = metaLinks.createUser;

        this.userCollectionMeta = this.resolveCollectionMeta(collectionMeta);
        this.userCollectionLinks = this.resolveCollectionLinks(metaLinks);
        this.userCreateAccess = this.linksService.hasLink(this.userCollectionLinks.createUser);
        this.userCollectionRoleIds = this.metadataService.resolveMetadataIdValues(this.userCollectionMeta.roleIds.values);

        this.assignUsers(collectionData.user);
      });
  }

  private assignUsers(collectionBody: any[]): void {
    this.users = this.convertResponse(collectionBody);
  }

  private convertResponse(collectionBody: any[]): Array<User> {
    return collectionBody.map(item =>
      this.adapter.adapt(item, item.links, null));
  }

  private resolveCollectionLinks(metaLinks: any): UserLinksCollection {
    return new UserLinksCollection(metaLinks.self, metaLinks.createUser);
  }

  private resolveCollectionMeta(collectionMeta: any): UserMeta {
    return collectionMeta;
  }
}
