import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashBoardComponent } from "./dash-board.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: DashBoardComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashBoardComponent],
  exports: [RouterModule]
})
export class DashBoardModule {}
