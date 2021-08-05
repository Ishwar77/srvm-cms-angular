import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GalleryOverviewDetailsComponent } from "./gallery-overview-details.component";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AppSharedModule } from "src/app/_shared/app-shared.module";

const routes: Routes = [
  {
    path: "",
    component: GalleryOverviewDetailsComponent
  },
  {
    path: ":idcategory",
    component: GalleryOverviewDetailsComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryOverviewDetailsComponent],
  exports: [RouterModule]
})
export class GalleryOverviewDetailsModule { }
