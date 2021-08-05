import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlumniDataComponent } from "./alumni-data.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [{ path: "", component: AlumniDataComponent }];

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AlumniDataComponent],
  exports: [RouterModule]
})
export class AlumniDataModule {}
