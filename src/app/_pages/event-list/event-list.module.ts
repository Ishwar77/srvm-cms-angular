import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventListComponent } from "./event-list.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ImagePopupComponent } from "../image-popup/image-popup.component";

const routes: Routes = [
  {
    path: "",
    component: EventListComponent
  }
];
@NgModule({
  declarations: [EventListComponent],
  entryComponents: [ImagePopupComponent],
  imports: [
    CommonModule,
    AppSharedModule,

    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EventListModule { }
