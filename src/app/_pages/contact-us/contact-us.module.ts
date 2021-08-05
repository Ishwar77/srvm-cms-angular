import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ContactUsComponent } from "./contact-us.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { Routes, RouterModule } from "@angular/router";
import { AgmCoreModule } from "@agm/core";

const routes: Routes = [
  {
    path: "",
    component: ContactUsComponent
  }
];
@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    AppSharedModule,

    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCYlHZvn-p46mnxKkY7n8GUAFhhMPrbWyk",
      libraries: ["places"]
    })
  ],
  exports: [RouterModule]
})
export class ContactUsModule {}
