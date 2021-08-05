import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AppConstants } from "src/app/_helpers/app-constants";
import { Banner } from "src/app/_models/banner";
import { FormBuilder } from "@angular/forms";
import { BannerService } from "src/app/_services/banner.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";

@Component({
  selector: "app-banner-list",
  templateUrl: "./banner-list.component.html",
  styleUrls: ["./banner-list.component.css"]
})
export class BannerListComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session

  bannerList: Banner[] = [];

  buttonDiasable: boolean = false;

  imageToSave = "";
  imageToShow: any;
  isImageLoading: boolean;

  galleryTotalDataCount;
  galleryLimit = 0;
  galleryCurrentPageno = 1;

  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private bannerService: BannerService,
    private authenticationService: AuthenticationService
  ) {
    this.AppMessages = AppMessagesEn;
  }

  ngOnInit() {
    this.getBannerImageList();
  }
  openSaveUpdateDialog() {
    this.router.navigateByUrl("/banner");
  }

  getBannerImageList() {
    this.bannerService.getImage().subscribe(
      data => {
        const responseData = data;

        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          this.bannerList = responseData["data"] as Banner[];
        }
      },
      error => {}
    );
  }
  activateConfirmFn(idbanner: number) {
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
            this.deleteBanner(idbanner);
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

  deleteBanner(idbanner) {
    this.bannerService.delete(idbanner).subscribe(
      data => {
        const responseData = data;
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as Banner;
          this.getBannerImageList();
          this.authenticationService.showSuccessMsgFn(
            this.AppMessages.delete_label1
          );
        }
      },
      error => {}
    );
  }
}
