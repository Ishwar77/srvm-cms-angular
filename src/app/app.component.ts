import { Component } from "@angular/core";
import {
  AppMessagesEn,
  AppComponentEn,
  AppMenuMessagesEn
} from "./_helpers/app-messages-en";
import { AppConstants } from "./_helpers/app-constants";
import { AuthenticationService } from "./_services/authentication.service";
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  NavigationStart,
  RouteConfigLoadStart,
  // RouteConfig,
  // LoadEnd
} from "@angular/router";
import * as moment from "moment";
import { AdmissionformactivService } from "./_services/admissionformactiv.service";
import { AdmissionFormActive } from "./_models/admissionFormActive";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "SVRM";


  marked = false;
  theCheckbox = false;
  admissionFormActive: AdmissionFormActive = new AdmissionFormActive();
  UserLimit = 0;
  admissionFormActiveList;
  booleanValue: boolean;
  // App Data\
  AppConstants: any = AppConstants;
  AppMessages: any = AppMessagesEn;
  AppMenuMessages: any;
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

  //workerWorkSlotsList: GigWorkerWorkSlots[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private admissionformactivService: AdmissionformactivService
  ) {
    this.PageMessages = AppComponentEn;
    this.AppMenuMessages = AppMenuMessagesEn;

    this.currentFullUrl = window.location.href;

    if (this.currentFullUrl.includes("privacy-policy")) {
      setTimeout(() => {
        this.router.navigateByUrl("/privacy-policy");
      }, 10);
    } else if (this.currentFullUrl.includes("terms-of-use")) {
      setTimeout(() => {
        this.router.navigateByUrl("/terms-of-use");
      }, 10);
    } else if (this.currentFullUrl.includes("user/register")) {
      setTimeout(() => {
        this.router.navigateByUrl("/user/register");
      }, 10);
    }

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
          this.setProfilePic();
        }
      } else {
        this.userSession = null;
        this.role = null;
      }
    });

    this.checkUserSession = this.authService.getUserDataOnly();

    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.role = this.userSession.role;
    }
  }

  ngOnInit() {
    this.getAdmissionFormListByPageNo(1)
    //  this.chechBox()
    this.router.events.subscribe(res => {
      // console.log(res);
      this.isLoginPage =
        this.router.url.includes("login") || this.router.url.includes("forgot");
      // || !this.router.url.includes('privacy-policy');

      this.isRegistrationPage = this.router.url.includes("register");
      this.showLogoFlag =
        this.router.url.includes("privacy-policy") ||
        this.router.url.includes("terms-of-use");

      let bodyElement = document.getElementsByTagName("body");
      if (this.router.url.includes("register")) {
        bodyElement[0].classList.add("page-registration");
        bodyElement[0].classList.remove("page-login");
      } else if (this.router.url.includes("login")) {
        bodyElement[0].classList.add("page-login");
        bodyElement[0].classList.remove("page-registration");
      } else {
        bodyElement[0].classList.remove("page-registration");
        bodyElement[0].classList.remove("page-login");
      }

      // console.log(res);
      if (!(res instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    // this.router.events.subscribe(event => {
    //   if (event instanceof RouteConfigLoadStart) {
    //     console.log('RouteConfigLoadStart');
    //   } else if (event instanceof RouteConfigLoadEnd) {
    //     console.log('RouteConfigLoadEnd');
    //   }
    // });

    this.setProfilePic();
  }

  openPrivacyPolicyPage() {
    // this.router.navigateByUrl("privacy_Policy");
    //  window.open('http://app.gigmos.com/#/privacy-policy', '_blank');
  }



  setProfilePic() {
    if (this.checkUserSession) {
      setTimeout(() => {
        this.getAndSetAuthUserProfileImage(this.userSession);
      }, 100);
    }
  }

  usersaveupdate() {
    this.router.navigateByUrl("user-profile");
  }
  changePassword() {
    this.router.navigateByUrl("changePassword");
  }

  logout() {
    this.authService.logout();
  }



  getAndSetAuthUserProfileImage(userDataObj: any) {
    if (userDataObj.profile_image) {
      let modelObj: any = {};
      modelObj.fileurl = userDataObj.profile_image;
    }
  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
    //console.log(this.marked);
    this.admissionFormActive.idadmissionFormActive = 1;
    this.admissionFormActive.admissionFormActive_text = this.marked;
    this.admissionformactivService.visibleDisable(this.admissionFormActive).subscribe(
      data => {
        const responseData = data;
      },
      err => {
        console.log(err)
      }
    );
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
        this.chechBox()

      },
      err => {
        console.log(err);
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  chechBox() {

    if (this.admissionFormActiveList[0].admissionFormActive_text === "1") {
      this.booleanValue = true;

    } else {
      this.booleanValue = false;
    }
  }

}

