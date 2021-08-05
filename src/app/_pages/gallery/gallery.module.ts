import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryComponent } from "./gallery.component";
import { RouterModule, Routes } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {
    path: ":category",
    component: GalleryComponent
  },
  { path: ":idgallery", component: GalleryComponent }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryComponent],
  exports: [RouterModule]
})
export class GalleryModule { }
