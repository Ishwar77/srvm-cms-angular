import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TermsOfUseComponent } from "./terms-of-use.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {
    path: "",
    component: TermsOfUseComponent
  }
];

@NgModule({
  declarations: [TermsOfUseComponent],
  imports: [
    CommonModule,
    AppSharedModule,

    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TermsOfUseModule { }
