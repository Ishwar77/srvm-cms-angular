import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HistoryService } from "src/app/_services/history.service";
import { AppConstants } from "src/app/_helpers/app-constants";
import { HistoryData } from "src/app/_models/history";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  AppConstants: any = AppConstants;
  historylist: HistoryData[];
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
    private historyService: HistoryService
  ) {
    this.AppMessages = AppMessagesEn;
    this.checkUserSession = this.authService.getUserDataOnly();

    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.roleId = this.userSession.role;
      //  console.log(this.roleId);
    } else {
      this.router.navigate(["/history"]);
    }
  }

  ngOnInit() {
    this.getUserListByPageNo(1);
  }
  getUserListByPageNo(pageno: number) {
    this.getUserList(pageno);
  }

  getUserList(pageno: number) {
    // console.log("hist component");
    this.historyService.getList(pageno, this.UserLimit).subscribe(
      data => {
        const responseData = data;
        //console.log("responseData" + JSON.stringify(data));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.historylist = listData["result"] as HistoryData[];
            // console.log(this.historylist);
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
