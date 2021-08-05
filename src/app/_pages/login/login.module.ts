import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login.component";
import { AppSharedModule } from "../../_shared/app-shared.module";

const routes: Routes = [{ path: "", component: LoginComponent }];

@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent]
})
export class LoginModule { }
