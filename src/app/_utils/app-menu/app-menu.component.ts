import { Component, OnInit } from "@angular/core";
import {
  AppMenuMessagesEn,
  AppMessagesEn
} from "src/app/_helpers/app-messages-en";
import { AppConstants } from "src/app/_helpers/app-constants";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { Router } from "@angular/router";
import { AdmissionformactivService } from "src/app/_services/admissionformactiv.service";
import { AdmissionFormActive } from "src/app/_models/admissionFormActive";

@Component({
  selector: "app-menu",
  templateUrl: "./app-menu.component.html",
  styleUrls: ["./app-menu.component.css"]
})
export class AppMenuComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session
  roleId: number = 0;
  userSession: any;
  userName: any;
  userEmail: any;
  checkUserSession: any;
  UserLimit = 0;
  admissionFormActive: AdmissionFormActive = new AdmissionFormActive();
  admissionFormActiveList
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private admissionformactivService: AdmissionformactivService
  ) {
    this.checkUserSession = this.authService.getUserDataOnly();
    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.roleId = this.userSession.role;
      this.userName = this.userSession["idregistration_obj.mobile_number"];
      this.userEmail = this.userSession["idregistration_obj.email_id"];
    } else {
      this.router.navigate(["/user"]);
    }

    this.AppMessages = AppMessagesEn;
    this.PageMessages = AppMenuMessagesEn;
  }

  ngOnInit() {
    this.getAdmissionFormListByPageNo(1)
    this.authService.isLoggedIn.subscribe(value => {
      if (value) {
        this.checkUserSession = this.authService.getUserData();
        if (this.checkUserSession) {
          this.userSession = this.checkUserSession;
          this.roleId = this.userSession.role;
        }
      } else {
        this.userSession = null;
        this.roleId = null;
      }
    });
  }
  getAdmissionFormListByPageNo(pageno: number) {
    this.getAdmissionList(pageno);
  }

  getAdmissionList(pageno: number) {
    // console.log("+++++++++++++++++++++++++++");
    this.admissionformactivService.getList(pageno, this.UserLimit).subscribe(
      data => {
        const responseData = data;
        // console.log(responseData)
        let listData = responseData["data"];
        //  console.log(listData)
        this.admissionFormActiveList = listData["result"] as AdmissionFormActive[];
        // console.log(this.admissionFormActiveList);
        // console.log(this.admissionFormActiveList[0].admissionFormActive_text);
      },
      err => {
        console.log(err);
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }
  checkSession() {
    if (this.admissionFormActiveList) {
      if (this.admissionFormActiveList[0].admissionFormActive_text === '0') return false;
      return true
    }
  }
}
