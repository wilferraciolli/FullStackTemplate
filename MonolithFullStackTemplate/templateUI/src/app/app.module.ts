import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from "./shared/footer/footer.component";
import {HeaderComponent} from "./shared/header/header.component";
import {HomeComponent} from "./home/home.component";
import {LoadingComponent} from "./shared/components/loading/loading.component";
import {LoginComponent} from "./login/login.component";
import {MatConfirmDialogComponent} from "./shared/components/mat-confirm-dialog/mat-confirm-dialog.component";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {RegistrationComponent} from "./registration/registration.component";
import {TemplateComponent} from "./users/user-details/template/template.component";
import {UserDetailsComponent} from "./users/user-details/user-details.component";
import {UserDetailsProfileComponent} from "./users/user-details/user-details-profile/user-details-profile.component";
import {WrapperComponent} from "./shared/wrapper/wrapper.component";
import {UserSettingsComponent} from "./users/user-details/user-settings/user-settings.component";
import {CommonModule, DatePipe} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {ErrorInterceptor} from "./_helpers/error.interceptor";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MAT_DATE_LOCALE} from "@angular/material/core";


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
    UserDetailsProfileComponent,
    UserSettingsComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: []},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
