import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Banner } from "src/app/_models/banner";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { BannerService } from "src/app/_services/banner.service";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.css"]
})
export class BannerComponent implements OnInit {
  AppConstants: any = AppConstants;
  AppMessages: any;
  imageToSave = "";
  imageChangedEvent: any = "";
  statusOpenImageDialog = false;
  imageSetForUpdateChanged = false;
  statusFormUpdating: boolean = false;

  statusImageUpload: boolean = false;
  fileSize;
  imageFormatArray: string[] = Object.values(AppConstants.imageFileFormats);
  fileValidStatus: boolean = false;
  prevoiusAdvertuserUrl: string;
  id: number = 0;
  //date
  SpeciedInputField: boolean = true;

  updateButton: boolean = false;
  //html data
  bannerObjFG: FormGroup;
  bannerObj: Banner = new Banner();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private bannerService: BannerService
  ) {
    this.AppMessages = AppMessagesEn;
  }

  ngOnInit() {}

  updateImage() {
    if (this.imageSetForUpdateChanged === true) {
      if (this.fileSize > 0 && this.imageSetForUpdateChanged === true) {
        this.statusOpenImageDialog = false;
        this.imageChangedEvent = "";
        (<HTMLInputElement>document.getElementById("selectImage")).value = "";
        // this.studentObj.profile_image = this.imageToSave;
        this.imageUploadAndUpdate();
      } else {
        this.authService.showWarningMsgFn("image file size greater than 3 mb ");
      }
    } else {
      this.authService.showWarningMsgFn("Error in updating image ");
    }
  }
  previousImg;
  showImageDialog() {
    this.statusOpenImageDialog = true;
    this.imageChangedEvent = "";
    // this.imageToSave = "";
    this.imageSetForUpdateChanged = false;
    this.previousImg = this.imageToSave;
    // this.previousImg = this.studentObj.profile_image;
  }

  hideImageDialog() {
    this.statusOpenImageDialog = false;
    this.imageChangedEvent = "event";
    this.imageToSave = "";
    this.imageToSave = this.previousImg;
    this.imageSetForUpdateChanged = false;
    (<HTMLInputElement>document.getElementById("selectImage")).value = "";
  }

  imageCropped(image: string) {
    var base64str = image.substr(22);
    var decoded = atob(base64str);
    var fileSizeMb;
    var fileSizeKb;
    fileSizeMb = decoded.length / 1000000;
    fileSizeKb = decoded.length / 1000;
    this.fileSize = fileSizeMb;
    this.imageToSave = image;
    this.imageSetForUpdateChanged = true;
    if (this.statusFormUpdating === true) {
      document
        .getElementById("studentImage")
        .setAttribute("src", this.imageToSave);
    }
  }

  fileChangeEvent(event: any): void {
    var filetype = event.srcElement.files[0].type;
    let imageType = filetype.split("/")[1];
    if (this.imageFormatArray.indexOf(imageType) > -1) {
      this.fileValidStatus = false;
      this.imageChangedEvent = event;
    } else {
      this.fileValidStatus = true;
      this.imageToSave = "";
      this.imageChangedEvent = "";
    }
  }
  imageUploadAndUpdate() {
    // this.authService.markFormGroupTouched(this.bannerObjFG);
    this.spinnerService.show();
    this.bannerObj.banner_image = this.imageToSave;
    this.bannerService.imageUpload(this.bannerObj).subscribe(
      data => {
        const responseData = data as any;
        if (
          responseData["status_code"] ===
          AppConstants.RESPONSE_STATUS_CODE_SUCCESS
        ) {
          this.bannerObj = responseData["data"];

          // this.statusImageUpload = true;
          this.imageToSave = "";
          this.imageSetForUpdateChanged = false;
          // this.getGalleryImageById(this.id);
          this.spinnerService.hide();
          this.authService.showSuccessMsgFn(
            "Your Application Submitted SuccessFully"
          );
          this.router.navigate(["/banner_list"]);
        } else {
          this.authService.showWarningMsgFn(
            this.AppMessages.res_msg_status_error
          );
        }
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  // getGalleryImageById(id) {
  //   this.spinnerService.show();

  //   this.bannerService.getGalleryImageById(id).subscribe(
  //     data => {
  //       const responseData = data as any;
  //       this.imageToSave = "data:image/png;base64," + responseData["data"];
  //       this.spinnerService.hide();
  //     },
  //     err => {
  //       // Spinner Hide
  //       this.spinnerService.hide();
  //       this.authService.showErrorMsgCommonFn(err);
  //     }
  //   );
  // }
}
