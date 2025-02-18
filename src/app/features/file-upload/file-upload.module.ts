import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload.component';
import { SharedModule } from '../../shared/shared.module';


const routes:Routes = [
  {path: '', component:FileUploadComponent}
]

@NgModule({
  declarations: [],
  imports: [
    FileUploadComponent,
    RouterModule.forChild(routes),
  ],
})
export class FileUploadModule { }
