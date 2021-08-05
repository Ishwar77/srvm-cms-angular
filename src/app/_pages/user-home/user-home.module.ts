import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserHomeComponent } from "./user-home.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";

import { DialogEventDetailsComponent } from "../dialog-event-details/dialog-event-details.component";

const routes: Routes = [
  {
    path: "",
    component: UserHomeComponent
  }
];
@NgModule({
  imports: [
    CommonModule,

    ReactiveFormsModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserHomeComponent],
  exports: [RouterModule],
  entryComponents: []
})
export class UserHomeModule { }
