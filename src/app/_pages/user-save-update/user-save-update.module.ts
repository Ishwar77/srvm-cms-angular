import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserSaveUpdateComponent } from "./user-save-update.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
const routes: Routes = [
  {
    path: "",
    component: UserSaveUpdateComponent
  },
  { path: ":iduser", component: UserSaveUpdateComponent }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [UserSaveUpdateComponent],
  exports: [RouterModule]
})
export class UserSaveUpdateModule { }
