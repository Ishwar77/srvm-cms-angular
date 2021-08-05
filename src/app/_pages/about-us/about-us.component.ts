import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/_helpers/app-constants';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/_utils/spinner/spinner.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AppMessagesEn } from 'src/app/_helpers/app-messages-en';
import { AboutUs } from 'src/app/_models/about-Us';
import { AboutUsService } from 'src/app/_services/about-us.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  AppConstants: any = AppConstants;
  aboutUslist: AboutUs[];
  UserLimit = 0;
  UserTotalDataCount;
  UserCurrentPageno = 1;
  AppMessages: any;
  checkUserSession: any;
  role: number = 0;
  userSession: any;
  roleId: number = 0;
  constructor(
    private router: Router,
    private spinnerService: SpinnerService,
    private authService: AuthenticationService,
    private aboutUsService: AboutUsService,
    private _sanitizationService: DomSanitizer,
  ) {
    this.AppMessages = AppMessagesEn;
    this.checkUserSession = this.authService.getUserDataOnly();

    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.roleId = this.userSession.role;
      //  console.log(this.roleId);
    } else {
      this.router.navigate(["/aboutus"]);
    }
  }

  ngOnInit() {
    this.getAboutUSListByPageNo(1);
  }

  videosanitizer(value) {
    return this._sanitizationService.bypassSecurityTrustHtml(value);
  }

  getAboutUSListByPageNo(pageno: number) {
    this.getAboutUsList(pageno);
  }

  getAboutUsList(pageno: number) {
    // console.log("hist component");
    this.aboutUsService.getList(pageno, this.UserLimit).subscribe(
      data => {
        const responseData = data;
        //console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.aboutUslist = listData["result"] as AboutUs[];
            // console.log(this.aboutUslist);
            this.UserTotalDataCount = listData["count"];
            this.UserLimit = listData["limit"];
            this.UserCurrentPageno = +listData["pageno"];
          }
        } else {
          // Show Warning Msg Notification
          // console.log("error occur");
          this.authService.showWarningMsgCommonFn(responseData);
        }
        this.spinnerService.hide();
      },
      err => {
        console.log(err);
        // Spinner Hide
        this.spinnerService.hide();

        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  // opensaveupdate() {
  //   this.router.navigateByUrl("/history_save_update");
  // }
}

