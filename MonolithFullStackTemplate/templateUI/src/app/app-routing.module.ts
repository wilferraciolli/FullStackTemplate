import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './_helpers/auth.guard';
import { UserProfileComponent } from './users/user-details/user-profile/user-profile.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { TemplateComponent } from './users/user-details/template/template.component';
import { PersonListComponent } from './people/person-list/person-list.component';
import { UserSettingsComponent } from './users/user-details/user-settings/user-settings.component';
import { PersonListResolver } from './people/person-list/person-list.resolver';
import { UserListResolver } from './users/user-list/user-list.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'users',
    loadChildren: async () => (await  import('./users/users.module')).UsersModule
  },
  {
    path: 'people',
    loadChildren: async () => (await import('./people/people.module')).PeopleModule
  },
  {
    path: 'userdetails/:id', component: UserDetailsComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: UserProfileComponent },
      { path: 'settings', component: UserSettingsComponent },
      { path: 'template', component: TemplateComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
