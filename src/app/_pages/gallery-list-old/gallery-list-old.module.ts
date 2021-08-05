import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryListOldComponent } from "./gallery-list-old.component";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { MatSelectModule } from "@angular/material/select";
const routes: Routes = [
  {
    path: "",
    component: GalleryListOldComponent
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
  declarations: [GalleryListOldComponent],
  exports: [RouterModule]
})
export class GalleryListOldModule { }
