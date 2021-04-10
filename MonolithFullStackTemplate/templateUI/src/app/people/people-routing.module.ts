import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonListComponent } from './person-list/person-list.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { PersonListResolver } from './person-list/person-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: PersonListComponent,
    canActivate: [AuthGuard],
    resolve: { peopleResponse: PersonListResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {
}
