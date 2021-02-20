import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvertIdToStringValuePipe } from '../_helpers/convert-id-to-value.pipe';
import { ConvertIdsToStringValuePipe } from '../_helpers/user-role-mapper-pipe';
import { ProjectMaterialModule } from '../app.module.material';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProjectMaterialModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [
    ConvertIdToStringValuePipe,
    ConvertIdsToStringValuePipe
  ],
  exports: [
    ConvertIdToStringValuePipe,
    ConvertIdsToStringValuePipe,
    CommonModule,
    FormsModule,
    ProjectMaterialModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class SharedModule {
}

