import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsSaveUpdateComponent } from './about-us-save-update.component';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/_shared/app-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';

const routes: Routes = [
  {
    path: "new",
    component: AboutUsSaveUpdateComponent
  },
  { path: ":idaboutUs", component: AboutUsSaveUpdateComponent }
];
@NgModule({
  declarations: [AboutUsSaveUpdateComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})
export class AboutUsSaveUpdateModule { }
