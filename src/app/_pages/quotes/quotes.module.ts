import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuotesComponent } from "./quotes.component";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
const routes: Routes = [
  {
    path: "",
    component: QuotesComponent
  },
  { path: ":idquotes", component: QuotesComponent }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [QuotesComponent]
})
export class QuotesModule { }
