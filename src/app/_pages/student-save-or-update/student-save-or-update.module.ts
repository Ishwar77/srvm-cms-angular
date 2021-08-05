import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { StudentSaveOrUpdateComponent } from "./student-save-or-update.component";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "new",
    component: StudentSaveOrUpdateComponent
  },
  { path: ":idstudent", component: StudentSaveOrUpdateComponent }
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentSaveOrUpdateComponent],
  exports: [RouterModule]
})
export class StudentSaveOrUpdateModule { }
