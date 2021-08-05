import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryCategoryListComponent } from "./gallery-category-list.component";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AppSharedModule } from "src/app/_shared/app-shared.module";

const routes: Routes = [
  {
    path: "",
    component: GalleryCategoryListComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryCategoryListComponent],
  exports: [RouterModule]
})
export class GalleryCategoryListModule { }
