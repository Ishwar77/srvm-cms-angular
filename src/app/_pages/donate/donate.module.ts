import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DonateComponent } from "./donate.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";

const routes: Routes = [{ path: "", component: DonateComponent }];

@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [DonateComponent]
})
export class DonateModule { }
