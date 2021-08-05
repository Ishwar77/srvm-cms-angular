import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppUserInfoComponent } from "./_utils/app-user-info/app-user-info.component";
import { AppSharedModule } from "./_shared/app-shared.module";
import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";
import { AuthGuardService } from "./_guards/auth-guard.service";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { HttpConfigInterceptor } from "./interceptor/httpconfig.interceptor";
import { ContactUsService } from "./_services/contact-us.service";
import { StudentService } from "./_services/student.service";
import { DateFormatService } from "./_services/date-format.service";
import { ChangePasswordService } from "./_services/change-password.service";
import { UserService } from "./_services/user.service";
import { GalleryCategoryService } from "./_services/gallery-category.service";
import { HistoryService } from "./_services/history.service";
import { UserHomeComponent } from './_pages/user-home/user-home.component';
import { DialogEventDetailsComponent } from "./_pages/dialog-event-details/dialog-event-details.component";
import { DialogGalleryDetailsComponent } from "./_pages/dialog-gallery-details/dialog-gallery-details.component";
// import { OwlModule } from "ngx-owl-carousel";

// import { GalleryListComponent } from './_pages/gallery-list/gallery-list.component';
// import { UserprofileComponent } from './_pages/userprofile/userprofile.component';
// import { UserUpdateComponent } from './_pages/user-update/user-update.component';
// import { UserEventListComponent } from './_pages/user-event-list/user-event-list.component';
// import { UserListComponent } from "./_pages/user-list/user-list.component";
// import { UserSaveUpdateComponent } from "./_pages/user-save-update/user-save-update.component";
// import { TestimonialsListComponent } from './_pages/testimonials-list/testimonials-list.component';
// import { TestimonialsComponent } from './_pages/testimonials/testimonials.component';
// import { TermsOfUseComponent } from './_pages/terms-of-use/terms-of-use.component';
// import { StudentSaveOrUpdateComponent } from './_pages/student-save-or-update/student-save-or-update.component';
// import { StudentListComponent } from './_pages/student-list/student-list.component';
// import { StudentExcelUploadComponent } from './_pages/student-excel-upload/student-excel-upload.component';
// import { StudentDetailsOverviewComponent } from './_pages/student-details-overview/student-details-overview.component';
// import { QuotesListComponent } from './_pages/quotes-list/quotes-list.component';
// import { QuotesComponent } from './_pages/quotes/quotes.component';
import { DialogAlumniDetailsComponent } from './_pages/dialog-alumni-details/dialog-alumni-details.component';
// import { PrivacyPolicyComponent } from './_pages/privacy-policy/privacy-policy.component';
// import { LoginComponent } from './_pages/login/login.component';
// import { HistorySaveUpdateComponent } from './_pages/history-save-update/history-save-update.component';
// import { HistoryComponent } from './_pages/history/history.component';
// import { GalleryOverviewUpdateComponent } from './_pages/gallery-overview-update/gallery-overview-update.component';
// import { GalleryOverviewDetailsComponent } from './_pages/gallery-overview-details/gallery-overview-details.component';
import { GalleryListOldComponent } from './_pages/gallery-list-old/gallery-list-old.component';
// import { GalleryCategoryListComponent } from './_pages/gallery-category-list/gallery-category-list.component';
// import { GalleryCategoryComponent } from './_pages/gallery-category/gallery-category.component';
import { CKEditorModule } from "ng2-ckeditor";
// import { GalleryComponent } from './_pages/gallery/gallery.component';
// import { ForgotPasswordComponent } from './_pages/forgot-password/forgot-password.component';
// import { EventSaveorUpdateComponent } from './_pages/event-saveor-update/event-saveor-update.component';
// import { EventListComponent } from './_pages/event-list/event-list.component';
// import { EventDetailsOverviewComponent } from './_pages/event-details-overview/event-details-overview.component';
// import { DonateUpdateComponent } from './_pages/donate-update/donate-update.component';
// import { DonateComponent } from './_pages/donate/donate.component';
// import { AboutUsComponent } from "./_pages/about-us/about-us.component";
// import { AboutUsSaveUpdateComponent } from "./_pages/about-us-save-update/about-us-save-update.component";
// import { AdmissionComponent } from "./_pages/admission/admission.component";
// import { AdmissionFormComponent } from "./_pages/admission-form/admission-form.component";
// import { AdmissionUpdateComponent } from "./_pages/admission-update/admission-update.component";
// import { AlumniRegistrationComponent } from "./_pages/alumni-registration/alumni-registration.component";
// import { AlumniDataComponent } from "./_pages/alumni-data/alumni-data.component";
// import { BannerComponent } from "./_pages/banner/banner.component";
// import { BannerListComponent } from "./_pages/banner-list/banner-list.component";
// import { ChangePasswordComponent } from "./_pages/change-password/change-password.component";
// import { ContactUsComponent } from "./_pages/contact-us/contact-us.component";
// import { DashBoardComponent } from "./_pages/dash-board/dash-board.component";
import { ModuleWithProviders } from "@angular/core";

// import { CKEditorModule as CKEditorModule2 } from "ckeditor4-angular";
import { AgmCoreModule } from "@agm/core";
import { GalleryOverviewDetailsModule } from "./_pages/gallery-overview-details/gallery-overview-details.module";
import { UserprofileModule } from './_pages/userprofile/userprofile.module';
import { UserUpdateModule } from './_pages/user-update/user-update.module';
import { UserListModule } from './_pages/user-list/user-list.module';
import { UserEventListModule } from './_pages/user-event-list/user-event-list.module';
import { TermsOfUseModule } from './_pages/terms-of-use/terms-of-use.module';
import { LoginModule } from './_pages/login/login.module';
import { HistoryModule } from './_pages/history/history.module';
import { GalleryCategoryModule } from './_pages/gallery-category/gallery-category.module';
import { GalleryModule } from './_pages/gallery/gallery.module';
import { HistorySaveUpdateModule } from './_pages/history-save-update/history-save-update.module';
import { GalleryOverviewUpdateModule } from './_pages/gallery-overview-update/gallery-overview-update.module';
import { PrivacyPolicyModule } from './_pages/privacy-policy/privacy-policy.module';
import { DonateModule } from './_pages/donate/donate.module';
import { DonateUpdateModule } from './_pages/donate-update/donate-update.module';
import { EventListModule } from './_pages/event-list/event-list.module';
import { EventSaveorUpdateModule } from './_pages/event-saveor-update/event-saveor-update.module';
import { ForgotPasswordModule } from './_pages/forgot-password/forgot-password.module';
import { EventDetailsOverviewModule } from './_pages/event-details-overview/event-details-overview.module';
import { DashBoardModule } from './_pages/dash-board/dash-board.module';
import { ContactUsModule } from './_pages/contact-us/contact-us.module';
import { StudentSaveOrUpdateModule } from './_pages/student-save-or-update/student-save-or-update.module';
import { StudentExcelUploadModule } from './_pages/student-excel-upload/student-excel-upload.module';
import { AlumniDataModule } from './_pages/alumni-data/alumni-data.module';
import { StudentDetailsOverviewModule } from './_pages/student-details-overview/student-details-overview.module';
import { GalleryListModule } from './_pages/gallery-list/gallery-list.module';
import { TestimonialsModule } from './_pages/testimonials/testimonials.module';
import { TestimonialsListModule } from './_pages/testimonials-list/testimonials-list.module';
import { QuotesModule } from './_pages/quotes/quotes.module';
import { QuotesListModule } from './_pages/quotes-list/quotes-list.module';
import { AboutUsModule } from './_pages/about-us/about-us.module';
import { AboutUsSaveUpdateModule } from './_pages/about-us-save-update/about-us-save-update.module';
import { AdmissionFormModule } from './_pages/admission-form/admission-form.module';
import { AlumniRegistrationModule } from './_pages/alumni-registration/alumni-registration.module';
import { AdmissionModule } from './_pages/admission/admission.module';
import { AdmissionUpdateModule } from './_pages/admission-update/admission-update.module';
import { ChangePasswordModule } from './_pages/change-password/change-password.module';
import { BannerModule } from './_pages/banner/banner.module';
import { BannerListModule } from './_pages/banner-list/banner-list.module';
import { UserSaveUpdateModule } from './_pages/user-save-update/user-save-update.module';
import { GalleryCategoryListModule } from './_pages/gallery-category-list/gallery-category-list.module';
import { StudentListModule } from './_pages/student-list/student-list.module';
import { UserHomeModule } from './_pages/user-home/user-home.module';

@NgModule({
  declarations: [
    AppComponent, AppUserInfoComponent, 

    // Start
    // UserHomeComponent,
    GalleryListOldComponent
    // End
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AppSharedModule,
    SnotifyModule,
    //OwlModule,
    CKEditorModule,
    // CKEditorModule2,
    AgmCoreModule,

    // Screens Modules Start
    GalleryOverviewDetailsModule,
    UserprofileModule,
    UserUpdateModule,
    UserListModule,
    UserEventListModule,
    TermsOfUseModule,
    LoginModule,
    HistoryModule,
    GalleryCategoryModule,
    GalleryModule,
    HistorySaveUpdateModule,
    GalleryOverviewUpdateModule,
    PrivacyPolicyModule,
    DonateModule,
    DonateUpdateModule,
    EventListModule,
    EventSaveorUpdateModule,
    ForgotPasswordModule,
    EventDetailsOverviewModule,
    DashBoardModule,
    ContactUsModule,
    StudentSaveOrUpdateModule,
    StudentExcelUploadModule,
    AlumniDataModule,
    StudentDetailsOverviewModule,
    GalleryListModule,
    TestimonialsModule,
    TestimonialsListModule,
    QuotesModule,
    QuotesListModule,
    AboutUsModule,
    AboutUsSaveUpdateModule,
    AdmissionFormModule,
    AlumniRegistrationModule,
    AdmissionModule,
    AdmissionUpdateModule,
    ChangePasswordModule,
    BannerModule,
    BannerListModule,
    UserSaveUpdateModule,
    GalleryCategoryListModule,
    StudentListModule,
    UserHomeModule
    

    // All The Modules End
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: "SnotifyToastConfig", useValue: ToastDefaults },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    SnotifyService,
    AuthGuardService,
    ContactUsService,
    StudentService,
    DateFormatService,
    ChangePasswordService,
    UserService,
    GalleryCategoryService,
    HistoryService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
  static forRoot(): ModuleWithProviders<AppSharedModule> {
    return {
      ngModule: AppSharedModule
    };
  }
}
