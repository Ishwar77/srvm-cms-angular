import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { User } from "src/app/_models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { UserService } from "src/app/_services/user.service";
import { AppMessagesEn, UserList } from "src/app/_helpers/app-messages-en";
import { DateFormatService } from "src/app/_services/date-format.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session

  UserList: User[] = [];

  UserTotalDataCount;
  UserLimit = 0;
  UserCurrentPageno = 1;
  UserDetailsList: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private dateFormatService: DateFormatService
  ) {
    this.AppMessages = AppMessagesEn;
    this.PageMessages = UserList;
  }

  ngOnInit() {
    this.getUserListByPageNo(1);
  }
  getUserListByPageNo(pageno: number) {
    this.getUserList(pageno);
  }

  getUserList(pageno: number) {
    this.userService.getList(pageno, this.UserLimit).subscribe(
      data => {
        const responseData = data;
        // console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.UserList = listData["result"] as User[];
            this.UserTotalDataCount = listData["count"];
            this.UserLimit = listData["limit"];
            this.UserCurrentPageno = +listData["pageno"];
          }
        } else {
          // Show Warning Msg Notification
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

  openSaveUpdateDialog() {
    this.router.navigateByUrl("/userprofile");
  }
  activateConfirmFn(iduser: number) {
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
            this.deleteUser(iduser);
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

  deleteUser(iduser) {
    this.userService.delete(iduser).subscribe(
      data => {
        const responseData = data;

        let msg_code = responseData["status_code"];

        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as User;
          //this.getUserList(pageno);
          // console.log("data=====" + msg_code);
          // this.router.navigate(["/userList"]);
          // this.router
          //   .navigateByUrl("/RefrshComponent", { skipLocationChange: true })
          //   .then(() => this.router.navigate(["/userList"]));
          this.ngOnInit();
          // Show Success Msg
          this.authService.showSuccessMsgFn(this.AppMessages.user_msg_delete);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }
}
