import { NgModule } from '@angular/core';
import { PeopleRoutingModule } from './people-routing.module';
import { PersonComponent } from './person/person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { MatConfirmDialogComponent } from '../shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PersonComponent,
    PersonListComponent
  ],
  imports: [
    PeopleRoutingModule,
    SharedModule
  ],
  // add components used in pop ups
  entryComponents: [PersonComponent, MatConfirmDialogComponent]
})
export class PeopleModule {
}
