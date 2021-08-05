import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "./history.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", component: HistoryComponent }];

@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [HistoryComponent]
})
export class HistoryModule { }
