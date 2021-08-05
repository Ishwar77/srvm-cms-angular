import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryOverviewUpdateComponent } from './gallery-overview-update.component';
import { Routes, RouterModule } from '@angular/router';
import { AppSharedModule } from 'src/app/_shared/app-shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: GalleryOverviewUpdateComponent
  },
  { path: ":idgallery", component: GalleryOverviewUpdateComponent }
];
@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryOverviewUpdateComponent]
})
export class GalleryOverviewUpdateModule { }
