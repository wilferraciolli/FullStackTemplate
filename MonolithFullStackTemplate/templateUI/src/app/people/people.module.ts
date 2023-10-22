import {NgModule} from '@angular/core';
import {PeopleRoutingModule} from './people-routing.module';
import {PersonComponent} from './person/person.component';
import {PersonListComponent} from './person-list/person-list.component';
import {MatConfirmDialogComponent} from '../shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import {SharedModule} from '../shared/shared.module';
import {PhotoThumbnailComponent} from "../shared/business-components/photo-thumbnail/photo-thumbnail.component";
import {PersonPhotoComponent} from "../shared/business-components/person-photo/person-photo.component";

@NgModule({
  declarations: [
    PersonComponent,
    PersonListComponent
  ],
  imports: [
    PeopleRoutingModule,
    SharedModule,
    PhotoThumbnailComponent,
    PersonPhotoComponent
  ],
  // add components used in pop ups
  // TODO migration entryComponents: [PersonComponent, MatConfirmDialogComponent]
})
export class PeopleModule {
}
