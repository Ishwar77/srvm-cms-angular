import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";
import { UserHomeComponent } from "./_pages/user-home/user-home.component";
import { GalleryListComponent } from "./_pages/gallery-list/gallery-list.component";
import { UserprofileComponent } from "./_pages/userprofile/userprofile.component";
import { UserUpdateComponent } from "./_pages/user-update/user-update.component";
import { UserListComponent } from "./_pages/user-list/user-list.component";
import { UserEventListComponent } from "./_pages/user-event-list/user-event-list.component";
import { UserSaveUpdateComponent } from "./_pages/user-save-update/user-save-update.component";
import { TermsOfUseComponent } from "./_pages/terms-of-use/terms-of-use.component";
import { TestimonialsListComponent } from "./_pages/testimonials-list/testimonials-list.component";
import { TestimonialsComponent } from "./_pages/testimonials/testimonials.component";
import { StudentExcelUploadComponent } from "./_pages/student-excel-upload/student-excel-upload.component";
import { QuotesComponent } from "./_pages/quotes/quotes.component";
import { QuotesListComponent } from "./_pages/quotes-list/quotes-list.component";
import { LoginComponent } from "./_pages/login/login.component";
import { HistoryComponent } from "./_pages/history/history.component";
import { GalleryCategoryComponent } from "./_pages/gallery-category/gallery-category.component";
import { GalleryCategoryListComponent } from "./_pages/gallery-category-list/gallery-category-list.component";
import { GalleryOverviewDetailsComponent } from "./_pages/gallery-overview-details/gallery-overview-details.component";
import { GalleryComponent } from "./_pages/gallery/gallery.component";
import { HistorySaveUpdateComponent } from "./_pages/history-save-update/history-save-update.component";
import { GalleryOverviewUpdateComponent } from "./_pages/gallery-overview-update/gallery-overview-update.component";
import { PrivacyPolicyComponent } from "./_pages/privacy-policy/privacy-policy.component";
import { DonateComponent } from "./_pages/donate/donate.component";
import { DonateUpdateComponent } from "./_pages/donate-update/donate-update.component";
import { EventListComponent } from "./_pages/event-list/event-list.component";
import { EventSaveorUpdateComponent } from "./_pages/event-saveor-update/event-saveor-update.component";
import { ForgotPasswordComponent } from "./_pages/forgot-password/forgot-password.component";
import { EventDetailsOverviewComponent } from "./_pages/event-details-overview/event-details-overview.component";
import { DashBoardComponent } from "./_pages/dash-board/dash-board.component";
import { ContactUsComponent } from "./_pages/contact-us/contact-us.component";
import { StudentSaveOrUpdateComponent } from "./_pages/student-save-or-update/student-save-or-update.component";
import { StudentListComponent } from "./_pages/student-list/student-list.component";
import { ChangePasswordComponent } from "./_pages/change-password/change-password.component";
import { AlumniDataComponent } from "./_pages/alumni-data/alumni-data.component";
import { BannerComponent } from "./_pages/banner/banner.component";
import { BannerListComponent } from "./_pages/banner-list/banner-list.component";
import { StudentDetailsOverviewComponent } from "./_pages/student-details-overview/student-details-overview.component";
import { AdmissionComponent } from "./_pages/admission/admission.component";
import { AdmissionUpdateComponent } from "./_pages/admission-update/admission-update.component";
import { AboutUsComponent } from "./_pages/about-us/about-us.component";
import { AboutUsSaveUpdateComponent } from "./_pages/about-us-save-update/about-us-save-update.component";
import { AdmissionFormComponent } from "./_pages/admission-form/admission-form.component";
import { AlumniRegistrationComponent } from "./_pages/alumni-registration/alumni-registration.component";

const routes: Routes = [
  // { path: "", loadChildren: "./_pages/login/login.module#LoginModule" },
  {
    path: "",
    component: UserHomeComponent
  },

  {
    path: "user-update",
    loadChildren: "./_pages/user-update/user-update.module#UserUpdateModule"
  },

  {
    path: "user-profile",
    loadChildren: "./_pages/userprofile/userprofile.module#UserprofileModule"
  },
  {
    path: "userprofile",
    loadChildren:
      "./_pages/user-save-update/user-save-update.module#UserSaveUpdateModule"
  },
  {
    path: "userList",
    loadChildren: "./_pages/user-list/user-list.module#UserListModule"
  },
  {
    path: "user_event_list",
    loadChildren:
      "./_pages/user-event-list/user-event-list.module#UserEventListModule"
  },

  {
      path: "Terms_Of_Use",
      loadChildren: "./_pages/terms-of-use/terms-of-use.module#TermsOfUseModule"
  },

  { path: "login", loadChildren: "./_pages/login/login.module#LoginModule" },

  {
    path: "history",
    loadChildren: "./_pages/history/history.module#HistoryModule"
  },

  {
    path: "gallery_category",
    loadChildren:
      "./_pages/gallery-category/gallery-category.module#GalleryCategoryModule"
  },

  {
    path: "gallery_category_list",
    loadChildren:
      "./_pages/gallery-category-list/gallery-category-list.module#GalleryCategoryListModule"
  },

  // {
  //   path: "gallery_overview_details",
  //   component: GalleryOverviewDetailsComponent,
  // },

  // {
  //   path: "gallery_overview_details/:idcategory",
  //   component: GalleryOverviewDetailsComponent,
  // },

  {
    path: "gallery_overview_details",
    loadChildren:
      "./_pages/gallery-overview-details/gallery-overview-details.module#GalleryOverviewDetailsModule"
  },


  {
    path: "gallery",
    loadChildren: "./_pages/gallery/gallery.module#GalleryModule"
  },

 {
    path: "history_save_update",
    loadChildren:
      "./_pages/history-save-update/history-save-update.module#HistorySaveUpdateModule"
  },

  {
    path: "gallery_overview_update",
    loadChildren:
      "./_pages/gallery-overview-update/gallery-overview-update.module#GalleryOverviewUpdateModule"
  },

  {
    path: "privacy-policy-page",
    loadChildren:
      "./_pages/privacy-policy/privacy-policy.module#PrivacyPolicyModule"
  },

  {
    path: "donate",
    loadChildren: "./_pages/donate/donate.module#DonateModule"
  },

 {
    path: "donate_save_update",
    loadChildren: "./_pages/donate-update/donate-update.module#DonateUpdateModule"
  },

  {
    path: "eventList",
    loadChildren: "./_pages/event-list/event-list.module#EventListModule"
  },

  {
    path: "eventSave",
    loadChildren:
      "./_pages/event-saveor-update/event-saveor-update.module#EventSaveorUpdateModule"
  },

 {
    path: "forgot",
    loadChildren:
      "./_pages/forgot-password/forgot-password.module#ForgotPasswordModule"
  },
 
  {
    path: "eventOverview",
    loadChildren:
      "./_pages/event-details-overview/event-details-overview.module#EventDetailsOverviewModule"
  },

  {
    path: "admin",
    loadChildren: "./_pages/dash-board/dash-board.module#DashBoardModule"
  },

  {
    path: "contact-us",
    loadChildren: "./_pages/contact-us/contact-us.module#ContactUsModule"
  },

  {
    path: "alumniSave",
    loadChildren:
      "./_pages/student-save-or-update/student-save-or-update.module#StudentSaveOrUpdateModule"
  },

  {
    path: "alumni-excel-upload",
    loadChildren:
      "./_pages/student-excel-upload/student-excel-upload.module#StudentExcelUploadModule"
  },
  
  {
    path: "alumniList",
    loadChildren: "./_pages/student-list/student-list.module#StudentListModule"
  },

  {
    path: "alumni",
    loadChildren: "./_pages/alumni-data/alumni-data.module#AlumniDataModule"
  },
  
  {
    path: "changePassword",
    loadChildren:
      "./_pages/change-password/change-password.module#ChangePasswordModule"
  },

  {
    path: "banner",
    loadChildren: "./_pages/banner/banner.module#BannerModule"
  },
  
  {
    path: "banner_list",
    loadChildren: "./_pages/banner-list/banner-list.module#BannerListModule"
  },

  {
    path: "alumniOverview",
    loadChildren:
      "./_pages/student-details-overview/student-details-overview.module#StudentDetailsOverviewModule"
  },

  // {
  //   path: "user",
  //   component: UserHomeComponent
  // },
  
  {
    path: "user",
    loadChildren: "./_pages/user-home/user-home.module#UserHomeModule"
  },

  {
    path: "gallery_list",
    loadChildren: "./_pages/gallery-list/gallery-list.module#GalleryListModule"
  },

  {
    path: "testimonials_save_update",
    loadChildren: "./_pages/testimonials/testimonials.module#TestimonialsModule"
  },

  {
    path: "testimonials_list",
    loadChildren:
      "./_pages/testimonials-list/testimonials-list.module#TestimonialsListModule"
  },
  
  {
    path: "studentExcelUpload",
    component: StudentExcelUploadComponent
  },
  {
    path: "Quotes",
    loadChildren: "./_pages/quotes/quotes.module#QuotesModule"
  },

   {
    path: "quotes_list",
    loadChildren: "./_pages/quotes-list/quotes-list.module#QuotesListModule"
  },
   
  {
    path: "aboutus",
    loadChildren: "./_pages/about-us/about-us.module#AboutUsModule"
  },

  {
    path: "about_Us_Save_Update",
    loadChildren: "./_pages/about-us-save-update/about-us-save-update.module#AboutUsSaveUpdateModule"
  },

  {
    path: "admissionForm",
    loadChildren:
      "./_pages/admission-form/admission-form.module#AdmissionFormModule"
    // "./_pages/admission-form/admission-form.module#AdmissionFormModule"
  },

  {
    path: "alumniRegistration",
    loadChildren:
      "./_pages/alumni-registration/alumni-registration.module#AlumniRegistrationModule"
  },
  {
    path: "admission",
    loadChildren:
      "./_pages/admission/admission.module#AdmissionModule"
  },

 {
    path: "admission_update",
    loadChildren:
      "./_pages/admission-update/admission-update.module#AdmissionUpdateModule"
  },

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
