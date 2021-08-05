import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { StudentExcelUploadComponent } from "./student-excel-upload.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";

const routes: Routes = [
  {
    path: "",
    component: StudentExcelUploadComponent
  }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [StudentExcelUploadComponent],
  exports: [RouterModule]
})
export class StudentExcelUploadModule { }
