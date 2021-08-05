import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { FormBuilder } from "@angular/forms";
import { GalleryService } from "src/app/_services/gallery.service";
import { GalleryCategory } from "src/app/_models/gallery-category";
import { AppConstants } from "src/app/_helpers/app-constants";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { GalleryCategoryService } from "src/app/_services/gallery-category.service";

@Component({
  selector: "app-gallery-category-list",
  templateUrl: "./gallery-category-list.component.html",
  styleUrls: ["./gallery-category-list.component.css"]
})
export class GalleryCategoryListComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session
  galleryCategory: GalleryCategory[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private galleryService: GalleryService,
    private authenticationService: AuthenticationService,
    private galleryCategoryService: GalleryCategoryService
  ) {
    this.AppMessages = AppMessagesEn;
  }

  ngOnInit() {
    this.galleryCategoryList();
  }

  openAddCategory() {
    this.router.navigateByUrl("/gallery_category");
  }

  galleryCategoryList() {
    this.galleryService.getGalleryCategoryList().subscribe(
      data => {
        const responseData = data;
        //  console.log(responseData);
        this.galleryCategory = responseData["data"] as GalleryCategory[];
      },
      error => {
        console.log(error);
        // Spinner Hide
        this.spinnerService.hide();

        this.authService.showErrorMsgCommonFn(error);
      }
    );
  }

  deleteConfirmFn(idcategory: number) {
    let confirmTitle = this.AppMessages.label_data_delete;
    let confirmBody = this.AppMessages.are_you_sure_want_to_delete;
    this.snotifyService.confirm(confirmBody, confirmTitle, {
      position: SnotifyPosition.centerCenter,
      closeOnClick: false,
      pauseOnHover: true,
      backdrop: 0.5,
      buttons: [
        {
          text: this.AppMessages.yes_label,
          action: toast => {
            this.deleteGalleryCategory(idcategory);
            this.snotifyService.remove(toast.id);
          },
          bold: true
        },
        {
          text: this.AppMessages.no_label,
          action: toast => {
            this.snotifyService.remove(toast.id);
          },
          bold: false
        }
      ]
    });
  }

  deleteGalleryCategory(idcategory) {
    this.galleryCategoryService.delete(idcategory).subscribe(
      data => {
        const responseData = data;
        //     console.log("data=====" + responseData);
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          // const responseData = data as GalleryCategory;
          //this.getStudentList();
          this.galleryCategoryList();
          this.authenticationService.showSuccessMsgFn("Deleted Sucessfully");
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
