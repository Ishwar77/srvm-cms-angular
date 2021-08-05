import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {
    path: "",
    component: ForgotPasswordComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPasswordComponent],
  exports: [RouterModule]
})
export class ForgotPasswordModule { }
