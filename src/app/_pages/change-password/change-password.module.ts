import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChangePasswordComponent } from "./change-password.component";
import { RouterModule, Routes } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: ChangePasswordComponent
  }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [ChangePasswordComponent],
  exports: [RouterModule]
})
export class ChangePasswordModule {}
