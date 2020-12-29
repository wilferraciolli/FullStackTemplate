import {Component, OnInit} from '@angular/core';
import {Person} from '../person';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {LinksService} from '../../_services/links-service';
import {NotificationService} from '../../shared/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogService} from '../../shared/dialog.service';
import {LoadingService} from '../../shared/components/loading/loading.service';
import {MetadataService} from '../../_services/metadata.service';
import {UserComponent} from '../../users/user/user.component';
import {Link} from '../../shared/response/link';
import {UserLinksCollection} from '../../users/user-links-collection';
import {PersonMeta} from '../person-meta';
import {PersonLinksCollection} from '../person-links-collection';
import * as _ from 'lodash';
import {finalize} from 'rxjs/operators';
import {PersonService} from '../person.service';
import {PeopleResponse} from './people-response';
import {ValueViewValue} from '../../shared/response/value-viewValue';
import {PersonAdapter} from '../person.adapter';
import {PersonComponent} from '../person/person.component';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  searchKey: string;
  people: Array<Person>;
  person: Person;

  personTemplateLink: Link;
  personCollectionLinks: PersonLinksCollection;
  personCollectionMeta: PersonMeta;

  personCollectionGenderIds: Array<ValueViewValue>;
  personCollectionMaritalStatusesIds: Array<ValueViewValue>;

  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  personCreateAccess: boolean;

  constructor(
    private personService: PersonService,
    private breakpointObserver: BreakpointObserver,
    private notificationService: NotificationService,
    private linksService: LinksService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private adapter: PersonAdapter,
    private router: Router,
    public loadingService: LoadingService,
    private metadataService: MetadataService
  ) {
  }

  ngOnInit(): void {
    if (_.isUndefined(history.state.peopleLink)) {
      console.log(history.state);
      console.log('could not find the get people link');
      this.router.navigate(['/home']);
    } else {
      this.loadAll(history.state.peopleLink.href);
    }
  }

  onSearchClear(): void {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter(): void {
    // this.users.filter = this.searchKey.trim().toLowerCase();
  }

  create(): void {
    const signInDialogRef = this.dialog.open(UserComponent, {
      width: '50%',
      height: '50%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      autoFocus: true,
      disableClose: true,
      data: {link: this.personCollectionLinks.createPerson}
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
      smallDialogSubscription.unsubscribe();
    });
  }

  private loadAll(url: string): void {

    this.loadingService.loadingOn();

    this.personService.getAll<PeopleResponse>(url)
      .pipe(finalize(() => this.loadingService.loadingOff()))
      .subscribe((response: PeopleResponse) => {
        const collectionData = response._data;
        const collectionMeta: any = response._metadata;
        const metaLinks: any = response._metaLinks;

        this.personTemplateLink = metaLinks.creratePerson;

        this.personCollectionMeta = this.resolveCollectionMeta(collectionMeta);
        this.personCollectionLinks = this.resolveCollectionLinks(metaLinks);
        this.personCreateAccess = this.linksService.hasLink(this.personCollectionLinks.createPerson);

        this.personCollectionGenderIds = this.metadataService.resolveMetadataIdValues(this.personCollectionMeta.genderId.values);
        this.personCollectionMaritalStatusesIds = this.metadataService.resolveMetadataIdValues(this.personCollectionMeta.maritalStatusId.values);

        this.assignPeople(collectionData.person);
      });
  }

  private assignPeople(collectionBody: any[]): void {
    this.people = this.convertResponse(collectionBody);
  }

  private convertResponse(collectionBody: any[]): Array<Person> {
    return collectionBody.map(item =>
      this.adapter.adapt(item, item.links, null));
  }

  private resolveCollectionLinks(metaLinks: any): PersonLinksCollection {

    return new UserLinksCollection(metaLinks.self, metaLinks.createPerson);
  }

  private resolveCollectionMeta(collectionMeta: any): PersonMeta {

    return collectionMeta;
  }

  onEdit(row: Person): void {
    const signInDialogRef = this.dialog.open(PersonComponent, {
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
      smallDialogSubscription.unsubscribe();
    });
  }

  delete(url: string): void {
    this.dialogService.openConfirmDialog('Are you sure you want to delete this person?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.personService.delete(url)
          .subscribe(data => {
              console.log('Success', data);
              this.notificationService.warn('Person deleted successfully');
              this.personService.reloadCurrentRoute(); // not working
            },
            error => {
              console.log('Error', error);
              this.notificationService.error('Person could not be deleted');
            });
      }
    });
  }
}
