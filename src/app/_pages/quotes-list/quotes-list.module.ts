import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuotesListComponent } from "./quotes-list.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: QuotesListComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuotesListComponent],
  exports: [RouterModule]
})
export class QuotesListModule { }
