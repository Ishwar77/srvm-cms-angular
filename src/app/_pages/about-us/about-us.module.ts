import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutUsComponent } from "./about-us.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";


const routes: Routes = [
  {
    path: "",
    component: AboutUsComponent
  },
  { path: ":idhistory", component: AboutUsComponent }
];
@NgModule({
  imports: [CommonModule,
    AppSharedModule,

    RouterModule.forChild(routes)],
  declarations: [AboutUsComponent]
})

export class AboutUsModule { }
