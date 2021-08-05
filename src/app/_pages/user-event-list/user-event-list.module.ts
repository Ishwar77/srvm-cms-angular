import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserEventListComponent } from "./user-event-list.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [{ path: "", component: UserEventListComponent }];

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserEventListComponent],
  exports: [RouterModule]
})
export class UserEventListModule { }
