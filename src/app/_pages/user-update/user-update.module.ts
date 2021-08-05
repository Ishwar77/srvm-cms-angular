import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserUpdateComponent } from "./user-update.component";

import { RouterModule, Routes } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
const routes: Routes = [
  { path: "", component: UserUpdateComponent },
  { path: ":iduser", component: UserUpdateComponent }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [UserUpdateComponent]
})
export class UserUpdateModule { }
