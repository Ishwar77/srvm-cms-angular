import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdmissionFormComponent } from "./admission-form.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: AdmissionFormComponent }];

@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [AdmissionFormComponent]
})
export class AdmissionFormModule {}
