import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// Angular Material Components
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { DateAdapter } from "@angular/material/core";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

// Utils
import { AppMenuComponent } from "../_utils/app-menu/app-menu.component";
import { AppBackButtonComponent } from "../_utils/app-back-button/app-back-button.component";
import { SpinnerComponent } from "../_utils/spinner/spinner.component";
import { ValidationMessagesComponent } from "../_utils/validation-messages/validation-messages.component";
import { LoadersCssModule } from "angular2-loaders-css";
import { CustomMobileNumberDirective } from "../_directives/custom-mobile-number.directive";
import { CustomInputDirective } from "../_directives/custom-input.directive";
import { AppConstants } from "../_helpers/app-constants";
import { RecaptchaModule } from "ng-recaptcha";
import { CustomPancardDirective } from "../_directives/custom-pancard.directive";
import { ImageCropperModule } from "ngx-image-cropper";
import { AppPaginationComponent } from "../_utils/app-pagination/app-pagination.component";
//import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ImagePopupComponent } from "../_pages/image-popup/image-popup.component";
import { DialogGalleryDetailsComponent } from "../_pages/dialog-gallery-details/dialog-gallery-details.component";
import { CustomPincodeNumberDirective } from "../_directives/custom-pincode-number.directive";
import { DialogEventDetailsComponent } from '../_pages/dialog-event-details/dialog-event-details.component';
import { DialogAlumniDetailsComponent } from '../_pages/dialog-alumni-details/dialog-alumni-details.component';

import { OwlModule } from "ngx-owl-carousel";

//import { CKEditorModule } from "ng2-ckeditor";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoadersCssModule,
    RecaptchaModule,
    ImageCropperModule,
    MatMenuModule,

    OwlModule,

    // MatRadioModule,
    //CKEditorModule
  ],
  exports: [
    // Forms
    FormsModule,
    ReactiveFormsModule,

    OwlModule,
    // Utils
    SpinnerComponent,
    AppBackButtonComponent,
    ValidationMessagesComponent,
    AppMenuComponent,
    AppPaginationComponent,

    // Angular Material Components
    MatTooltipModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatMenuModule,
    MatRadioModule,
    MatExpansionModule,
    MatSidenavModule,

    // Directives
    CustomMobileNumberDirective,
    CustomPancardDirective,
    CustomInputDirective,
    CustomPincodeNumberDirective,

    // Shared components with all other modules
    RecaptchaModule,
    ImageCropperModule,
    //CKEditorModule
  ],
  declarations: [
    SpinnerComponent,
    AppBackButtonComponent,
    ValidationMessagesComponent,
    AppMenuComponent,
    AppPaginationComponent,
    ImagePopupComponent,
    // Directives
    CustomPincodeNumberDirective,
    CustomPancardDirective,
    CustomInputDirective,
    DialogGalleryDetailsComponent,
    DialogAlumniDetailsComponent,
    DialogEventDetailsComponent,
    CustomMobileNumberDirective

    // Shared components with all other modules
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: AppConstants.APP_DATE_PICKER_FORMATS
    }
  ],
  entryComponents: [DialogGalleryDetailsComponent, DialogEventDetailsComponent, DialogAlumniDetailsComponent]
})
export class AppSharedModule { }
