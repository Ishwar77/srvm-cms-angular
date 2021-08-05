import { Component, OnInit } from '@angular/core';
import { Donate } from 'src/app/_models/donate';
import { AppConstants } from 'src/app/_helpers/app-constants';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/_utils/spinner/spinner.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DonateService } from 'src/app/_services/donate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AppMessagesEn } from 'src/app/_helpers/app-messages-en';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  AppConstants: any = AppConstants;
  donatelist: Donate[];
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
    private donateService: DonateService,
    private _sanitizationService: DomSanitizer,
  ) {
    this.AppMessages = AppMessagesEn;
    this.checkUserSession = this.authService.getUserDataOnly();

    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.roleId = this.userSession.role;
      //  console.log(this.roleId);
    } else {
      this.router.navigate(["/donate"]);
    }
  }

  ngOnInit() {
    this.getDonateListByPageNo(1);
  }

  videosanitizer(value) {
    return this._sanitizationService.bypassSecurityTrustHtml(value);
  }

  getDonateListByPageNo(pageno: number) {
    this.getdonateList(pageno);
  }

  getdonateList(pageno: number) {
    // console.log("hist component");
    this.donateService.getList(pageno, this.UserLimit).subscribe(
      data => {
        const responseData = data;
        //console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.donatelist = listData["result"] as Donate[];
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

