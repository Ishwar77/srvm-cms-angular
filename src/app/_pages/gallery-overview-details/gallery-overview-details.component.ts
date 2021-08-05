import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { FormBuilder } from "@angular/forms";
import { GalleryService } from "src/app/_services/gallery.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { AppConstants } from "src/app/_helpers/app-constants";
import { Gallery } from "src/app/_models/gallery.model";
import { GalleryCategory } from "src/app/_models/gallery-category";
import { MatDialog } from "@angular/material/dialog";
import { DialogGalleryDetailsComponent } from "../dialog-gallery-details/dialog-gallery-details.component";
import { GalleryCategoryService } from "src/app/_services/gallery-category.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-gallery-overview-details",
  templateUrl: "./gallery-overview-details.component.html",
  styleUrls: ["./gallery-overview-details.component.css"]
})
export class GalleryOverviewDetailsComponent implements OnInit {
  AppConstants: any = AppConstants;
  AppMessages: any;

  checkUserSession: any;
  role: number = 0;
  userSession: any;
  roleId: number = 0;
  tabNumberArray = [0, 1];
  tabNumber;
  imageFormatArray: string[] = Object.values(
    this.AppConstants.imageFileFormats
  );

  idgallery = 0;
  idcategory = 0;
  id: number;
  //date
  deleteData;
  galleryList: Gallery[] = [];
  galleryOpen: boolean = false;
  hideGalryList: boolean = false;
  galleryCategory: GalleryCategory[] = [];

  galleryCategoryList: GalleryCategory;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private galleryService: GalleryService,
    private galleryCategoryService: GalleryCategoryService,
    public dialog: MatDialog,
    private _sanitizationService: DomSanitizer
  ) {
    this.AppMessages = AppMessagesEn;

    this.checkUserSession = this.authenticationService.getUserData();

    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.roleId = this.userSession.role;
      //  console.log(this.roleId);
    } else {
      // this.router.navigate(["/gallery_overview_details"]);
      this.router.navigate(["/gallery_overview_details", this.idcategory]);
    }

    this.route.params.subscribe(params => {
      if (params.idcategory === 0) {
        this.id = params.idcategory;
        this.idcategory = params.idcategory;
      } else if (params.idcategory > 0) {
        this.id = params.idcategory;
        this.idcategory = params.idcategory;
        // this.getEventByid(this.id);
        this.galleryCategoryListById(this.id);
        this.loadGallery(this.id);
      }
    });
  }

  ngOnInit() { }

  galleryCategoryListById(Id) {
    // console.log("-----------------------");
    this.galleryCategoryService.getById(Id).subscribe(
      data => {
        const responseData = data;
        //console.log("-----------------------");
        // console.log(responseData);
        this.galleryCategoryList = responseData["data"] as GalleryCategory;
        // console.log(this.galleryCategoryList);
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        if (
          error.error.msgCode === AppConstants.RESPONSE_STATUS_CODE_UNAUTHORIZE
        ) {
          this.authenticationService.logout();
        } else {
          // Show Warning Msg Notification
        }
        this.authenticationService.showErrorMsgCommonFn(error);
      }
    );
  }
  videosanitizer(value) {
    return this._sanitizationService.bypassSecurityTrustResourceUrl(value);
  }
  loadGallery(categoryID) {
    this.hideGalryList = false;
    this.galleryService.getGalleryListBycategoryId(categoryID).subscribe(
      data => {
        const responseData = data;
        // console.log(responseData);
        this.galleryOpen = true;
        this.galleryList = responseData["data"] as Gallery[];
        //console.log(this.galleryList)
        for (let obj of this.galleryList) {
          obj.video_url = this.videosanitizer(obj.video_url);
        }
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        if (
          error.error.msgCode === AppConstants.RESPONSE_STATUS_CODE_UNAUTHORIZE
        ) {
          this.authenticationService.logout();
        } else {
          // Show Warning Msg Notification
        }
        this.authenticationService.showErrorMsgCommonFn(error);
      }
    );
  }

  openDialogGallery(galleryObj, index) {
    const dialogRef = this.dialog.open(DialogGalleryDetailsComponent, {
      width: "700px",
      hasBackdrop: true,
      data: { galleryObj: galleryObj, index: index }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  activateConfirmFn(gallaryobj) {
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
            this.deleteGallery(gallaryobj);
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

  deleteGallery(galleryObj) {
    //  console.log(JSON.stringify(galleryObj))
    this.deleteData = {
      idgallery: galleryObj.idgallery,
      gallery_image: galleryObj.gallery_image,
      image_type: galleryObj.image_type
    }
    this.galleryService.deleteById(this.deleteData).subscribe(
      data => {
        const responseData = data;
        // console.log("data=====" + responseData);
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as Gallery;

          // console.log(responseData);

          this.authenticationService.showSuccessMsgFn(
            this.AppMessages.delete_label1
          );
          this.loadGallery(this.idcategory);
        }
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        if (
          error.error.msgCode === AppConstants.RESPONSE_STATUS_CODE_UNAUTHORIZE
        ) {
          this.authenticationService.logout();
        } else {
          // Show Warning Msg Notification
        }
        this.authenticationService.showErrorMsgCommonFn(error);
      }
    );
  }

  goBack() {
    this.router.navigateByUrl("/gallery_list");
  }
}
