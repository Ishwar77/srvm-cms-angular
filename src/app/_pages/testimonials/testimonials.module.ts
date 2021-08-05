import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestimonialsComponent } from "./testimonials.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from 'ng2-ckeditor';

const routes: Routes = [
  {
    path: "",
    component: TestimonialsComponent
  },
  { path: ":idtestimonials", component: TestimonialsComponent }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestimonialsComponent]
})
export class TestimonialsModule { }
