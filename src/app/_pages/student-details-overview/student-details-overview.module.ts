import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentDetailsOverviewComponent } from "./student-details-overview.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "new",
    component: StudentDetailsOverviewComponent
  },
  {
    path: ":idstudent",
    component: StudentDetailsOverviewComponent
  }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [StudentDetailsOverviewComponent],
  exports: [RouterModule]
})
export class StudentDetailsOverviewModule { }
