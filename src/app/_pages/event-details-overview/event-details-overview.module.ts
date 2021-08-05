import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventDetailsOverviewComponent } from "./event-details-overview.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";

const routes: Routes = [
  {
    path: ":idevent",
    component: EventDetailsOverviewComponent
  }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [EventDetailsOverviewComponent],
  exports: [RouterModule]
})
export class EventDetailsOverviewModule { }
