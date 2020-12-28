import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WrapperComponent} from './shared/wrapper/wrapper.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProjectMaterialModule} from './app.module.material';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatConfirmDialogComponent } from './shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserProfileComponent } from './users/user-details/user-profile/user-profile.component';
import { UserComponent } from './users/user/user.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import { PersonComponent } from './people/person/person.component';
import {ConvertIdsToStringValuePipe} from './users/user-role-mapper-pipe';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { TemplateComponent } from './users/user-details/template/template.component';
import { PersonListComponent } from './people/person-list/person-list.component';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ConvertIdsToStringValuePipe,
    WrapperComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    RegistrationComponent,
    MatConfirmDialogComponent,
    PageNotFoundComponent,
    LoginComponent,
    UserListComponent,
    UserDetailsComponent,
    UserProfileComponent,
    UserComponent,
    PersonComponent,
    LoadingComponent,
    TemplateComponent,
    PersonListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ProjectMaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent],
  // add components used in pop ups
  entryComponents: [UserComponent, MatConfirmDialogComponent]
})
export class AppModule {
}
