import {NgModule} from '@angular/core';
import {provideRouter, RouterModule, Routes, withComponentInputBinding} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {UserDetailsProfileComponent} from "./users/user-details/user-details-profile/user-details-profile.component";
import {UserSettingsComponent} from "./users/user-details/user-settings/user-settings.component";
import {TemplateComponent} from "./users/user-details/template/template.component";
import {AuthGuard} from "./_helpers/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'users',
    loadChildren: async () => (await import('./users/users.module')).UsersModule
  },
  {
    path: 'people',
    loadChildren: async () => (await import('./people/people.module')).PeopleModule
  },
  {
    path: 'userdetails/:id', component: UserDetailsComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: UserDetailsProfileComponent},
      {path: 'settings', component: UserSettingsComponent},
      {path: 'template', component: TemplateComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule {
}
