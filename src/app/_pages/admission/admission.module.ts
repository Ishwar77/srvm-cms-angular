import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionComponent } from './admission.component';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/_shared/app-shared.module';

const routes: Routes = [
  {
    path: "",
    component: AdmissionComponent
  },
  { path: ":idadmission", component: AdmissionComponent }
];
@NgModule({
  imports: [CommonModule,
    AppSharedModule,

    RouterModule.forChild(routes)],
  declarations: [AdmissionComponent]
})
export class AdmissionModule { }
