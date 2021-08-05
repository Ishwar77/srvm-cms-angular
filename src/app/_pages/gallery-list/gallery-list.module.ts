import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryListComponent } from "./gallery-list.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: GalleryListComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryListComponent]
})
export class GalleryListModule { }
