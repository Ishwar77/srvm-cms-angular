import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentListComponent } from "./student-list.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";
import { DialogAlumniDetailsComponent } from "../dialog-alumni-details/dialog-alumni-details.component";

const routes: Routes = [
  {
    path: "",
    component: StudentListComponent
  }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [StudentListComponent],
  exports: [RouterModule],
  entryComponents: []
})
export class StudentListModule { }
