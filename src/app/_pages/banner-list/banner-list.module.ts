import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerListComponent } from "./banner-list.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";

const routes: Routes = [
  {
    path: "",
    component: BannerListComponent
  }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [BannerListComponent],
  exports: [RouterModule]
})
export class BannerListModule {}
