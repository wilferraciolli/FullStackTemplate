import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './shared/wrapper/wrapper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { MatConfirmDialogComponent } from './shared/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserProfileComponent } from './users/user-details/user-profile/user-profile.component';
import { UserComponent } from './users/user/user.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { TemplateComponent } from './users/user-details/template/template.component';
import { CommonModule, DatePipe } from '@angular/common';
import { UserSettingsComponent } from './users/user-details/user-settings/user-settings.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoadingComponent,
    LoginComponent,
    MatConfirmDialogComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    TemplateComponent,
    UserDetailsComponent,
    UserProfileComponent,
    UserSettingsComponent,
    WrapperComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
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

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}




