import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { FormBuilder } from "@angular/forms";
import { GalleryService } from "src/app/_services/gallery.service";
import { AppConstants } from "src/app/_helpers/app-constants";
import { Gallery } from "src/app/_models/gallery.model";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { GalleryCategory } from "src/app/_models/gallery-category";
import { DialogGalleryDetailsComponent } from "../dialog-gallery-details/dialog-gallery-details.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-gallery-list-old",
  templateUrl: "./gallery-list-old.component.html",
  styleUrls: ["./gallery-list-old.component.css"]
})
export class GalleryListOldComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session

  galleryList: Gallery[] = [];
  studentid = 0;
  StudentDetailsList: Gallery;

  buttonDiasable: boolean = false;
  galleryarray = [];
  eventTotalDataCount;
  eventLimit = 0;
  eventCurrentPageno = 1;
  gallary = [];
  imageToSave = "";
  imageToShow: any;
  isImageLoading: boolean;

  galleryTotalDataCount;
  galleryLimit = 0;
  galleryCurrentPageno = 1;

  id: number = 0;

  checkUserSession: any;
  role: number = 0;
  userSession: any;
  roleId: number = 0;

  userName: any;
  userEmail: any;

  admRightsFlag: boolean = false;
  empRightsFlag: boolean = false;

  galleryCategory: GalleryCategory[] = [];
  selectedCategoryId: number;

  galleryObj = new Gallery();
  filterSelectedArrayDefault = [];
  filterSelectedArray = [];
  dataNotFound: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
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
    // this.getgalleryListByPageNo(1);
    this.galleryCategoryList();
    //this.getGalleryListByIds();
  }

  openSaveUpdateDialog() {
    this.router.navigateByUrl("/gallery");
  }

  activateConfirmFn(idgallery: number) {
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
            this.deleteGallery(idgallery);
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

  openDialogGallery(galleryObj) {
    //   console.log(galleryObj);
    const dialogRef = this.dialog.open(DialogGalleryDetailsComponent, {
      width: "700px",
      hasBackdrop: true,
      data: galleryObj
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.getgalleryListByUserHome();
    });
  }

  deleteGallery(idgallery) {
    this.galleryService.delete(idgallery).subscribe(
      data => {
        const responseData = data;
        // console.log("data=====" + responseData);
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as Gallery;
          //this.getStudentList();

          this.authenticationService.showSuccessMsgFn(
            this.AppMessages.delete_label1
          );
          this.galleryCategoryList();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  galleryCategoryList() {
    this.galleryService.getGalleryCategoryList().subscribe(
      data => {
        const responseData = data;
        //  console.log(responseData);
        this.galleryCategory = responseData["data"] as GalleryCategory[];

        if (this.galleryCategory) {
          for (let i = 0; i < this.galleryCategory.length; i++) {
            this.filterSelectedArray.push(this.galleryCategory[i].idcategory);
          }
          //   this.filterSelectedArrayDefault = JSON.parse(
          //     JSON.stringify(this.filterSelectedArray)
          //   );
          //   console.log(
          //     "Result------------------" + this.filterSelectedArrayDefault
          //   );
          this.getGalleryListByIds(this.filterSelectedArray);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  //   galleryFilterClickAll(galleryCategory) {
  //     if (galleryCategory.isActive) {
  //       galleryCategory.isActive = false;
  //       this.filterSelectedArray = [];
  //       for (let i = 0; i < galleryCategory.length; i++) {
  //         galleryCategory[i].isActive = false;
  //       }
  //     } else {
  //       galleryCategory.isActive = true;
  //       for (let i = 0; i < galleryCategory.length; i++) {
  //         galleryCategory[i].isActive = true;
  //         this.filterSelectedArray.push(galleryCategory[i].idcategory);
  //       }
  //     }
  //     this.getGalleryListByIds(this.filterSelectedArray);
  //   }

  galleryFilterClickAll(galleryCategory) {
    if (galleryCategory.isActive) {
      galleryCategory.isActive = false;
      for (let i = 0; i < galleryCategory.length; i++) {
        galleryCategory[i].isActive = false;
        this.filterSelectedArray.push(galleryCategory[i].idcategory);
      }
    } else {
      galleryCategory.isActive = true;
      this.filterSelectedArray = [];
      for (let i = 0; i < galleryCategory.length; i++) {
        galleryCategory[i].isActive = true;
      }
    }
    this.getGalleryListByIds(this.filterSelectedArray);
  }

  //   galleryFilterClick(rowObj: GalleryCategory, galleryCategory) {
  //     if (rowObj.isActive) {
  //       rowObj.isActive = false;
  //       galleryCategory.isActive = false;
  //       var index = this.filterSelectedArray.indexOf(rowObj.idcategory);
  //       if (index > -1) {
  //         this.filterSelectedArray.splice(index, 1);
  //       }
  //       this.getGalleryListByIds(this.filterSelectedArray);
  //       galleryCategory.isActive = true;
  //       for (let i = 0; i < galleryCategory.length; i++) {
  //         if (!galleryCategory[i].isActive) {
  //           galleryCategory.isActive = false;
  //         }
  //       }
  //     } else {
  //       rowObj.isActive = true;
  //       this.filterSelectedArray.push(rowObj.idcategory);
  //       this.getGalleryListByIds(this.filterSelectedArray);
  //     }
  //   }

  galleryFilterClick(rowObj: GalleryCategory, galleryCategory) {
    if (rowObj.isActive) {
      rowObj.isActive = false;
      this.filterSelectedArray.push(rowObj.idcategory);
      this.getGalleryListByIds(this.filterSelectedArray);

      galleryCategory.isActive = false;
      for (let i = 0; i < galleryCategory.length; i++) {
        if (galleryCategory[i].isActive) {
          galleryCategory.isActive = true;
        }
      }
    } else {
      rowObj.isActive = true;
      galleryCategory.isActive = true;
      var index = this.filterSelectedArray.indexOf(rowObj.idcategory);
      if (index > -1) {
        this.filterSelectedArray.splice(index, 1);
      }
      this.getGalleryListByIds(this.filterSelectedArray);
      galleryCategory.isActive = true;
      for (let i = 0; i < galleryCategory.length; i++) {
        if (!galleryCategory[i].isActive) {
          galleryCategory.isActive = true;
        }
      }
    }
  }

  getGalleryListByIds(categoryID) {
    this.galleryObj.category = categoryID;
    //   console.log("FilterID AR----" + categoryID);

    this.galleryService.getGalleryListByIds(this.galleryObj).subscribe(
      data => {
        const responseData = data;
        console.log(responseData);

        // console.log(responseData);
        this.galleryList = responseData["data"] as Gallery[];
      },
      error => {
        console.log(error);
      }
    );
  }
}
