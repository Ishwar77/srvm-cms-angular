import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import {
  AppMessagesEn,
  AppComponentEn
} from "src/app/_helpers/app-messages-en";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dash-board",
  templateUrl: "./dash-board.component.html",
  styleUrls: ["./dash-board.component.css"]
})
export class DashBoardComponent implements OnInit {
  title = "Gigmos";

  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any = AppMessagesEn;
  PageMessages: any;
  // User Session
  role: number = 0;
  userSession: any;
  checkUserSession: any;
  showLoginLinkFlag: boolean = false;

  isSideNavVisible: boolean = false;

  isRegistrationPage: boolean = false;
  showLogoFlag: boolean = false;
  isLoginPage: boolean = false;

  currentFullUrl: string = "";

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.PageMessages = AppComponentEn;

    this.authService.userSessionNow.subscribe(userSessionNow => {
      if (userSessionNow) {
        this.userSession = userSessionNow;
        this.role = this.userSession.role;
        ``;
      } else {
        this.userSession = null;
        this.role = null;
      }
    });

    this.authService.showLoginLinkFlag.subscribe(showLoginLinkFlagData => {
      if (showLoginLinkFlagData) {
        this.showLoginLinkFlag = showLoginLinkFlagData;
      } else {
        this.showLoginLinkFlag = false;
      }
    });

    this.authService.isLoggedIn.subscribe(value => {
      if (value) {
        this.checkUserSession = this.authService.getUserData();
        if (this.checkUserSession) {
          this.userSession = this.checkUserSession;
          this.role = this.userSession.role;
          // this.setProfilePic();
        }
      } else {
        this.userSession = null;
        this.role = null;
      }
    });

    this.checkUserSession = this.authService.getUserData();

    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.role = this.userSession.role;
    }
  }

  ngOnInit() {}
}
