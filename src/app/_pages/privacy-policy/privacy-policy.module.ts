import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivacyPolicyComponent } from "./privacy-policy.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {
    path: "",
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [
    CommonModule,
    AppSharedModule,

    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PrivacyPolicyModule { }
