import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleRoutingModule } from './people-routing.module';
import { PersonComponent } from './person/person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatConfirmDialogComponent } from '../shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PersonComponent,
    PersonListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PeopleRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  // add components used in pop ups
  entryComponents: [PersonComponent, MatConfirmDialogComponent]
})
export class PeopleModule {
}
