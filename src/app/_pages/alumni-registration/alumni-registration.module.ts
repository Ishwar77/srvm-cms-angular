import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlumniRegistrationComponent } from "./alumni-registration.component";
import { Routes, RouterModule } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { RecaptchaModule } from "ng-recaptcha";

const routes: Routes = [
  { path: "", component: AlumniRegistrationComponent },
  { path: ":idstudent", component: AlumniRegistrationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    RouterModule.forChild(routes),
    RecaptchaModule
  ],
  declarations: [AlumniRegistrationComponent]
})
export class AlumniRegistrationModule {}
