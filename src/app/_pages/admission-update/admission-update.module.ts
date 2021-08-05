import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionUpdateComponent } from './admission-update.component';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/_shared/app-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

const routes: Routes = [
  {
    path: "new",
    component: AdmissionUpdateComponent
  },
  { path: ":idadmission", component: AdmissionUpdateComponent }
];
@NgModule({
  declarations: [AdmissionUpdateComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class AdmissionUpdateModule { }
