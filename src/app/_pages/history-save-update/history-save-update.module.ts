import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistorySaveUpdateComponent } from "./history-save-update.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "ng2-ckeditor";
const routes: Routes = [
  {
    path: "new",
    component: HistorySaveUpdateComponent
  },
  { path: ":idhistory", component: HistorySaveUpdateComponent }
];
@NgModule({
  declarations: [HistorySaveUpdateComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CKEditorModule
  ],
  exports: [RouterModule]
})
export class HistorySaveUpdateModule { }
