import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatConfirmDialogComponent } from '../shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent
  ],
  imports: [
    // CommonModule,
    // HttpClientModule,
    UsersRoutingModule,
    SharedModule,
    // ReactiveFormsModule
  ],
  // add components used in pop ups
  entryComponents: [UserComponent, MatConfirmDialogComponent]
})
export class UsersModule {
}
