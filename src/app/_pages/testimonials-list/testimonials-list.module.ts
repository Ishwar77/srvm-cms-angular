import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestimonialsListComponent } from "./testimonials-list.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: TestimonialsListComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TestimonialsListComponent],
  exports: [RouterModule]
})
export class TestimonialsListModule { }
