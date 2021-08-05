import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventSaveorUpdateComponent } from "./event-saveor-update.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CKEditorModule } from "ng2-ckeditor";

const routes: Routes = [
  {
    path: "new",
    component: EventSaveorUpdateComponent
  },
  { path: ":idevent", component: EventSaveorUpdateComponent }
];
@NgModule({
  declarations: [EventSaveorUpdateComponent],
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CKEditorModule
  ],
  exports: [RouterModule]
})
export class EventSaveorUpdateModule { }
