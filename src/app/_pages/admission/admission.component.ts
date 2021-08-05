import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/_helpers/app-constants';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/_utils/spinner/spinner.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { DomSanitizer } from '@angular/platform-browser';
import { AppMessagesEn } from 'src/app/_helpers/app-messages-en';
import { Admission } from 'src/app/_models/admission';
import { AdmissionService } from 'src/app/_services/admission.service';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  AppConstants: any = AppConstants;
  Admissionlist: Admission[];
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
    private AdmissionService: AdmissionService,
    private _sanitizationService: DomSanitizer,
  ) {
    this.AppMessages = AppMessagesEn;
    this.checkUserSession = this.authService.getUserDataOnly();

    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.roleId = this.userSession.role;
      //  console.log(this.roleId);
    } else {
      this.router.navigate(["/admission"]);
    }
  }

  ngOnInit() {
    this.getAdmissionListByPageNo(1);
  }

  videosanitizer(value) {
    return this._sanitizationService.bypassSecurityTrustHtml(value);
  }

  getAdmissionListByPageNo(pageno: number) {
    this.getAdmissionList(pageno);
  }

  getAdmissionList(pageno: number) {
    // console.log("hist component");
    this.AdmissionService.getList(pageno, this.UserLimit).subscribe(
      data => {
        const responseData = data;
        //console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.Admissionlist = listData["result"] as Admission[];
            // console.log(this.Admissionlist);
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

