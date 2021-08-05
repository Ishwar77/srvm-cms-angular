import { Component, OnInit } from "@angular/core";
import { GalleryService } from "src/app/_services/gallery.service";
import { GalleryCategory } from "src/app/_models/gallery-category";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { Gallery } from "src/app/_models/gallery.model";
import { AppConstants } from "src/app/_helpers/app-constants";
import { MatDialog } from "@angular/material/dialog";
import { DialogGalleryDetailsComponent } from "../dialog-gallery-details/dialog-gallery-details.component";

@Component({
  selector: "app-gallery-list",
  templateUrl: "./gallery-list.component.html",
  styleUrls: ["./gallery-list.component.css"]
})
export class GalleryListComponent implements OnInit {
  // App Messages
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;

  // User Session
  checkUserSession: any;
  role: number = 0;
  userSession: any;
  roleId: number = 0;

  // Category Array
  galleryCategory: GalleryCategory[] = [];
  totalCat: GalleryCategory[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,

    private galleryService: GalleryService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {
    this.AppMessages = AppMessagesEn;

    this.checkUserSession = this.authService.getUserData();

    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.roleId = this.userSession.role;
      //  console.log(this.roleId);
    } else {
      this.router.navigate(["/gallery_list"]);
    }
  }

  ngOnInit() {
    this.galleryCategoryList();
  }

  galleryCategoryList() {
    this.galleryService.getGalleryCategoryList().subscribe(
      data => {
        const responseData = data;
        this.galleryCategory = responseData["data"] as GalleryCategory[];
        let catIdName;
        for (let i = 0; i < this.galleryCategory.length; i++) {
          catIdName = {
            catId: this.galleryCategory[i].idcategory,
            catName: this.galleryCategory[i].gallery_category_name,
            catImg: ""
          };
          this.totalCat.push(catIdName);
        }
        this.getcatImgById();
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        if (
          error.error.msgCode === AppConstants.RESPONSE_STATUS_CODE_UNAUTHORIZE
        ) {
          this.authService.logout();
        } else {
          // Show Warning Msg Notification
        }
        this.authService.showErrorMsgCommonFn(error);
      }
    );
  }

  getcatImgById() {
    for (let i = 0; i < this.totalCat.length; i++) {
      this.galleryService
        .getGalleryLatestImageById(this.totalCat[i]["catId"])
        .subscribe(
          data => {
            const responseData = data;
            var galleryImage = responseData["data"] as Gallery;
            // console.log(JSON.stringify(responseData));
            if (galleryImage != null) {
              var galleryImg = galleryImage.gallery_image;

              this.totalCat[i]["catImg"] = galleryImg;
            } else {
            }
          },
          error => {
            console.log(error);
            this.spinnerService.hide();
            if (
              error.error.msgCode ===
              AppConstants.RESPONSE_STATUS_CODE_UNAUTHORIZE
            ) {
              this.authService.logout();
            } else {
              // Show Warning Msg Notification
            }
            this.authService.showErrorMsgCommonFn(error);
          }
        );
    }
  }

  gotoGalleryOverviewDetailsFn(number: number) {
    this.router.navigate(["/gallery_overview_details/" + number]);
  }

}
