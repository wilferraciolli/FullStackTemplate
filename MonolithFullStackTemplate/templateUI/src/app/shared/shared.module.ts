import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConvertIdToStringValuePipe} from '../_helpers/convert-id-to-value.pipe';
import {ConvertIdsToStringValuePipe} from '../_helpers/user-role-mapper-pipe';
import {TranslateModule} from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {ProjectMaterialModule} from "../app.module.material";
import {MatErrorComponent} from './components/mat-error/mat-error.component';

@NgModule({
  declarations: [
        ConvertIdToStringValuePipe,
        ConvertIdsToStringValuePipe,
        MatErrorComponent
    ],
    exports: [
        ConvertIdToStringValuePipe,
        ConvertIdsToStringValuePipe,
        CommonModule,
        FormsModule,
        ProjectMaterialModule,
        ReactiveFormsModule,
        TranslateModule,
        MatErrorComponent
    ],
  imports: [CommonModule,
        FormsModule,
        ProjectMaterialModule,
        ReactiveFormsModule,
        TranslateModule],
  providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule {
}

