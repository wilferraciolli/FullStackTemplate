import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {User} from '../user';
import {UserServiceService} from '../user-service.service';
import {UsersResponse} from './users-response';
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
import * as _ from 'lodash';
import {Link} from '../../shared/response/link';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {LoadingService} from '../../shared/components/loading/loading.service';
import {finalize} from 'rxjs/operators';
import {MetadataService} from '../../_services/metadata.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  searchKey: string;
  users: Array<User>;
  user: User;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  userTemplateLink: Link;
  userCollectionLinks: UserLinksCollection;
  userCollectionMeta: UserMeta;

  userCreateAccess: boolean;
  userCollectionRoleIds: Array<ValueViewValue>;

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

    this.activatedRoute.data.subscribe((data: { link: Link }) =>
      this.loadAll(data.link.href));
  }

  onSearchClear(): void {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): void {
    // this.users.filter = this.searchKey.trim().toLowerCase();
  }

  /**
   * Method to filter the columns the search should use.
   */
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

  private loadAll(url: string): void {

    this.loadingService.loadingOn();

    this.userService.getAll<UsersResponse>(url)
      .pipe(finalize(() => this.loadingService.loadingOff()))
      .subscribe((response: UsersResponse) => {
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
