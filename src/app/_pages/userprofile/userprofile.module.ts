import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserprofileComponent } from "./userprofile.component";
import { RouterModule, Routes } from "@angular/router";
import { AppSharedModule } from "src/app/_shared/app-shared.module";
import { AuthGuardService } from "src/app/_guards/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    component: UserprofileComponent
  },
  {
    path: ":id",
    component: UserprofileComponent,
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  imports: [CommonModule, AppSharedModule, RouterModule.forChild(routes)],
  declarations: [UserprofileComponent],
  exports: [RouterModule]
})
export class UserprofileModule { }
