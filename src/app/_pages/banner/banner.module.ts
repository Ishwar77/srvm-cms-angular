import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BannerComponent } from "./banner.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: BannerComponent
  }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [BannerComponent],
  exports: [RouterModule]
})
export class BannerModule {}
