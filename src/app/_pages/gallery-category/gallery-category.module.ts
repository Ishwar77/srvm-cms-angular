import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryCategoryComponent } from "./gallery-category.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";

const routes: Routes = [
  {
    path: "",
    component: GalleryCategoryComponent
  },

  {
    path: ":idcategory",
    component: GalleryCategoryComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatSelectModule
  ],
  declarations: [GalleryCategoryComponent],
  exports: [RouterModule]
})
export class GalleryCategoryModule { }
