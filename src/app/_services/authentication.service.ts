import { Injectable, NgZone } from "@angular/core";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AppConstants } from "../_helpers/app-constants";
import {
  FormGroup,
  ValidationErrors
} from "../../../node_modules/@angular/forms";
import { SnotifyService, SnotifyPosition, ToastDefaults } from "ng-snotify";
import { SpinnerService } from "../_utils/spinner/spinner.service";
import { AppMessagesEn } from "../_helpers/app-messages-en";
import { BehaviorSubject } from "rxjs";

import * as moment from "moment";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  public userSessionNow: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public showLoginLinkFlag: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  public workerAttendanceFlag: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(null);

  AppConstants: any = AppConstants;
  AppMessages: any;

  rolesArray: any[] = [];

  public static readonly URL_POST_LOGIN = environment.apiUrl + "/api/signin";
  public static readonly URL_POST_LOGIN_EMP =
    environment.apiUrl + "/api/signin/web/emp";

  public static readonly URL_POST_CHECK_SESSION =
    environment.apiUrl + "/validate-token/web";
  public static readonly URL_POST_FORGOT_PASSWORD =
    environment.apiUrl + "/api/forgot-password";
  public static readonly URL_POST_RESEND_OTP =
    environment.apiUrl + "/api/otp/resend";
  public static readonly URL_POST_VERIFY_OTP =
    environment.apiUrl + "/api/otp/verify";
  public static readonly CHANGE_PASSWORD_LOGIN_PAGE_URL =
    environment.apiUrl + "/api/user/customers/change-password/otp";
  // public static readonly CHANGE_PASSWORD_URL =
  //   environment.apiUrl + "/api/user/customers/change-password";

  public static readonly CHANGE_PASSWORD_URL =
    environment.apiUrl + "/api/user/change-password/otp";

  constructor(
    private http: HttpClient,
    private zone: NgZone,
    private router: Router,
    private snotifyService: SnotifyService,
    private spinnerService: SpinnerService,
    private sanitizer: DomSanitizer
  ) {
    // App Related
    this.AppMessages = AppMessagesEn;

    if (this.getUserData()) {
      this.isLoggedIn.next(true);
    }

    this.rolesArray = [
      {
        idroles: AppConstants.UROLE_ADMIN_ID,
        role: AppConstants.UROLE_ADMIN_NAME
      }
    ];
    snotifyService.config = ToastDefaults;
  }

  /**
   * Fetches and saves token for given user
   * @param loginForm
   */
  login(modelObj) {
    modelObj = this.trimFormValues(modelObj);

    return this.http.post(AuthenticationService.URL_POST_LOGIN, modelObj).pipe(
      map(response => {
        if (response) {
          var responseUser = response;
          localStorage.setItem("gigmosuserweb", JSON.stringify(responseUser));
          // this.reloadPage();
        }
        return response;
      })
    );
  }

  loginUserAfterEmailVerify(responseUser: any) {
    localStorage.setItem("gigmosuserweb", JSON.stringify(responseUser));
    // this.reloadPage();
    this.userSessionNow.next(responseUser);
    this.isLoggedIn.next(true);
  }

  updateNameInNavigationFn(nameData) {
    try {
      // class="usersession-name" id="userSessionName"
      // document.getElementById('userSessionName').innerText = nameData;

      if (localStorage.getItem("gigmosuserweb")) {
        var responseUser = JSON.parse(localStorage.getItem("gigmosuserweb"));
        responseUser["first_name"] = nameData;
        localStorage.setItem("gigmosuserweb", JSON.stringify(responseUser));
        this.userSessionNow.next(responseUser);
      }
    } catch (err) {
      console.debug("Some issues");
      // console.debug(err);
    }
  }

  logout() {
    // Show Spinner
    this.spinnerService.show();

    let userSession = this.getUserData();
    let role = 0;
    if (userSession) {
      role = userSession.role;
    }
    this.removeTokenOnly();
    this.isLoggedIn.next(false);
    this.naviagteToLogin(role);
    window.location.replace("");

    // Hide Spinner
    this.spinnerService.hide();
    this.showSuccessMsgFn("Logged out successfully.");
  }

  checkTokenData() {
    const gigmosuserweb = localStorage.getItem("gigmosuserweb");
    let userToken = "";
    if (gigmosuserweb != null) {
      const currentUserJson = JSON.parse(gigmosuserweb);
      userToken = currentUserJson.userToken;
    }

    const urlTemp = AuthenticationService.URL_POST_CHECK_SESSION;
    return this.http.post(urlTemp, {}).pipe(
      map(resp => {
        // const userSession = resp as UserSessionDataForm; // Samar Commented
        if (resp["status_code"] === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const userSession = resp["user"];
          localStorage.setItem("gigmosuserweb", JSON.stringify(userSession));
        } else {
          this.router.navigate(["/login"]);
        }
        return resp;
      })
    );
  }

  checkUserSession() {
    const gigmosuserweb = localStorage.getItem("gigmosuserweb");
    if (gigmosuserweb != null) {
      const currentUserJson = JSON.parse(gigmosuserweb);
      if (currentUserJson.iduser) {
        return true;
      } else {
        localStorage.removeItem("gigmosuserweb");
        this.router.navigate(["/login"]);
        //this.router.navigate(["/user"]);
        return false;
      }
    } else {
      this.router.navigate(["/login"]);
      // this.router.navigate(["/user"]);
      return false;
    }
  }

  getUserData() {
    //console.log("get user Data...only");
    const gigmosuserweb = localStorage.getItem("gigmosuserweb");
    if (gigmosuserweb != null) {
      // const currentUserJson: UserSessionDataForm = JSON.parse(gigmosuserweb); // Samar Commented
      const currentUserJson = JSON.parse(gigmosuserweb);
      // console.log(currentUserJson);
      if (currentUserJson.role > 0) {
        return currentUserJson;
      } else {
        this.removeToken();
        return false;
      }
    } else {
      this.removeToken();
      return false;
    }
  }

  getUserDataOnly() {
    // console.log("login>>>>>>>>");
    const gigmosuserweb = localStorage.getItem("gigmosuserweb");
    if (gigmosuserweb != null) {
      // const currentUserJson: UserSessionDataForm = JSON.parse(gigmosuserweb); // Samar Commented
      const currentUserJson = JSON.parse(gigmosuserweb);
      // console.log(currentUserJson);
      if (currentUserJson.role > 0) {
        return currentUserJson;
      } else {
        // this.removeTokenOnly();
        return false;
      }
    } else {
      //   this.removeTokenOnly();
      return false;
    }
  }

  getAccessToken() {
    const gigmosuserwebstr = localStorage.getItem("gigmosuserweb");
    if (gigmosuserwebstr != null) {
      const gigmosuserweb = JSON.parse(gigmosuserwebstr);
      if (gigmosuserweb.user_token_web && gigmosuserweb.user_token_web !== "") {
        return gigmosuserweb.user_token_web;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  removeTokenOnly() {
    this.userSessionNow.next(null);
    this.isLoggedIn.next(false);
    this.showLoginLinkFlag.next(false);
    localStorage.removeItem("gigmosuserweb");
  }

  removeToken() {
    this.userSessionNow.next(null);
    this.isLoggedIn.next(false);
    this.showLoginLinkFlag.next(false);
    localStorage.removeItem("gigmosuserweb");
    this.router.navigate(["/user"]);
  }

  reloadPage() {
    this.zone.runOutsideAngular(() => {
      window.location.replace("");
    });
  }

  reloadPageByUrl(url) {
    // console.log(url);
    this.zone.runOutsideAngular(() => {
      window.location.replace(url);
    });
  }

  forgotPassword(modelObj: any) {
    modelObj = this.trimFormValues(modelObj);
    // var config = { headers: { tasawetoken: AppConstants.TASAWETOKEN } };
    return this.http.post(
      AuthenticationService.URL_POST_FORGOT_PASSWORD,
      modelObj
    );
  }
  showWarningMsgCommonFn(responseData) {
    const errMessage = responseData["message"];
    const errMessageCode = responseData["msgCode"];
    this.showWarningMsgFn(errMessage);
  }

  // resendOTP(data: any) {
  //   var config = { headers: { tasawetoken: AppConstants.TASAWETOKEN } };
  //   return this.http.post(
  //     AuthenticationService.URL_POST_RESEND_OTP,
  //     data,
  //     config
  //   );
  // }

  // verifyOTP(data: any) {
  //   var config = { headers: { tasawetoken: AppConstants.TASAWETOKEN } };
  //   return this.http.post(
  //     AuthenticationService.URL_POST_VERIFY_OTP,
  //     data,
  //     config
  //   );
  // }

  resendOTP(modelObj: any) {
    modelObj = this.trimFormValues(modelObj);

    return this.http.post(AuthenticationService.URL_POST_RESEND_OTP, modelObj);
  }

  verifyOTP(modelObj: any) {
    modelObj = this.trimFormValues(modelObj);

    return this.http.post(AuthenticationService.URL_POST_VERIFY_OTP, modelObj);
  }
  changePasswordloginpage(modelObj) {
    modelObj = this.trimFormValues(modelObj);

    let urlToCall = AuthenticationService.CHANGE_PASSWORD_LOGIN_PAGE_URL;
    return this.http.post(urlToCall, modelObj);
  }

  changePassword(modelObj) {
    modelObj = this.trimFormValues(modelObj);

    let urlToCall = AuthenticationService.CHANGE_PASSWORD_URL;
    return this.http.post(urlToCall, modelObj);
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The group to cares
   */
  public markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

  /**
   * Marks all controls in a form group as touched
   * @param formGroup - The group to cares
   */
  public parseFormGroupErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log(
            "Key control: " + key + ", keyError: " + keyError + ", err value: ",
            controlErrors[keyError]
          );
        });
      }
    });
  }

  /**
   * Trim all controls in a form group
   * @param formGroup - The group to cares
   */
  public trimFormGroupValues(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key =>
      formGroup.get(key).setValue(formGroup.get(key).value.trim())
    );
    return formGroup;
  }

  /**
   * Trim all controls in a form group
   * @param formGroup - The group to cares
   */
  public trimFormValues(objData) {
    for (var key in objData) {
      if (objData.hasOwnProperty(key)) {
        var val = objData[key];
        // console.log("key:" + key + " , val:" + val);
        // console.log(typeof val);

        // (val.constructor === String) && console.log('its a string');
        if (typeof val === "string" || val instanceof String) {
          objData[key] = val.trim();
          // console.log("key:" + key + " , val:" + val);
        }
      }
    }

    return objData;
  }

  public navigateToHome(role?: number) {
    if (!role) {
      role = 0;
      if (this.userSessionNow) {
        role = this.userSessionNow["role"];
      }
    }

    switch (role) {
      case AppConstants.UROLE_MASTER_ID:
        this.router.navigate(["/dashboard/admin"]);
        break;

      case AppConstants.UROLE_ADMIN_ID:
        this.router.navigate(["/dashboard/admin"]);
        break;

      //   case AppConstants.UROLE_HR_ID:
      //     this.router.navigate(["/dashboard/admin"]);
      //     break;

      //   case AppConstants.UROLE_SM_ID:
      //     this.router.navigate(["/dashboard/sales-manager"]);
      //     break;

      //   case AppConstants.UROLE_OPS_ID:
      //     this.router.navigate(["/dashboard/operations"]);
      //     break;

      //   case AppConstants.UROLE_USER_ID:
      //     this.router.navigate(["/user/register"]);
      //     break;

      //   case AppConstants.UROLE_GIG_WORKER_ID:
      //     this.router.navigate(["/worker/dashboard"]);
      //     break;

      default:
        this.router.navigate(["/login"]);
        break;
    }
  }

  public naviagteToLogin(role: number) {
    switch (role) {
      case AppConstants.UROLE_ADMIN_ID:
        this.router.navigate(["/login/employee"]);
        break;
      // case AppConstants.UROLE_HR_ID:
      //   this.router.navigate(["/login/employee"]);
      //   break;
      default:
        this.router.navigate(["/login"]);
        break;
    }
  }

  // Snotify Function Starts
  // Success
  showSuccessMsgFn(message: string, heading?: string, timeout?: number) {
    if (!message) {
      message = "";
    }
    if (!heading) {
      heading = "";
    }
    if (!timeout) {
      timeout = 2000;
    }

    message = message.trim();
    heading = heading.trim();

    this.snotifyService.success(message, heading, {
      timeout: timeout,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop
    });
  }

  // Warnings
  showWarningMsgFn(message: string, heading?: string, timeout?: number) {
    if (!message) {
      message = "";
    }
    if (!heading) {
      heading = "";
    }
    if (!timeout) {
      timeout = 4000;
    }

    message = message.trim();
    heading = heading.trim();

    this.snotifyService.warning(message, heading, {
      timeout: timeout,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop
    });
  }

  // Errors
  showErrorMsgCommonFn(error, timeout?: number) {
    let notifyTitle = "";
    let notifyMsgBody = "";

    switch (error.status) {
      case 0:
        // Show Spinner
        this.spinnerService.show();

        // notifyTitle = 'Connection Problem';
        notifyMsgBody = this.AppMessages.res_msg_conn_refused_by_server;

        break;

      case 401:
        // notifyTitle = 'Session Expired';
        notifyMsgBody = this.AppMessages.res_msg_session_expired;
        this.logout();

        break;

      default:
        // let cusErroJson = JSON.parse(error['_body']);
        // let customizedErrorMsg = cusErroJson.message + ': ' + cusErroJson.error.message;

        // notifyTitle = cusErroJson.message;
        notifyMsgBody = this.AppMessages.res_msg_server_busy;

        break;
    }

    if (!timeout) {
      timeout = 10000;
    }

    this.showErrorMsgFn(notifyMsgBody);
  }

  showErrorMsgFn(message: string, heading?: string, timeout?: number) {
    if (!message) {
      message = "";
    }
    if (!heading) {
      heading = "";
    }
    if (!timeout) {
      timeout = 4000;
    }

    message = message.trim();
    heading = heading.trim();

    this.snotifyService.error(message, heading, {
      timeout: timeout,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      position: SnotifyPosition.rightTop
    });
  }

  // Snotify Function Ends

  loadLiveDataImageFn(img_url) {
    var randomNo = Math.floor(100000 + Math.random() * 900000);
    let dataUrl = img_url + "?" + randomNo;
    return dataUrl;
  }

  downloadB64(base64Data, filename) {
    var fileBase64 = "data:application/octet-stream;base64," + base64Data;
    var dwnlink = document.getElementById("dwnldLnk") as HTMLAnchorElement;
    // dwnlink.setAttribute('title', filename);
    dwnlink.title = filename;
    dwnlink.download = filename;
    dwnlink.href = fileBase64;
    dwnlink.click();
  }

  setImageSrcFn(imageTagId, imgData) {
    setTimeout(() => {
      if (imageTagId) {
        var srcDataFinal = "data:image/jpg;base64," + imgData;
        if (imgData) {
          if (document.getElementById(imageTagId)) {
            document
              .getElementById(imageTagId)
              .setAttribute("src", srcDataFinal);
          }
        }
      }
    }, 10);
  }

  getImageSrcForBase64(imgData) {
    var srcDataFinal = "";
    if (imgData) {
      srcDataFinal = "data:image/jpg;base64," + imgData;
    } else {
      // console.log("user_avatar");
      srcDataFinal = "assets/images/user_avatar.png";
    }
    return srcDataFinal;
  }

  formatDate(dateData) {
    if (dateData) {
      let responseDate = moment(dateData).format(
        AppConstants.APP_UI_DATE_FORMAT_1
      );
      return responseDate;
    } else {
      return dateData;
    }
  }

  formatDateTime(dateData) {
    if (dateData) {
      let responseDate = moment(dateData).format(
        AppConstants.APP_UI_DATE_TIME_FORMAT
      );
      return responseDate;
    } else {
      return dateData;
    }
  }

  getFullName(dateData) {
    let fullName = "";
    if (dateData) {
      fullName = dateData["first_name"];
      if (dateData["middle_name"]) {
        fullName = fullName + " " + dateData["middle_name"];
      }
      if (dateData["last_name"]) {
        fullName = fullName + " " + dateData["last_name"];
      }
      return fullName;
    } else {
      return fullName;
    }
  }

  getRoleName(id: number) {
    let roleName = "";
    if (id && id > 0) {
      let rolesArrayTemp = this.rolesArray.filter(x => x.idroles === id);
      if (rolesArrayTemp && rolesArrayTemp.length > 0) {
        roleName = rolesArrayTemp[0]["role"];
      }
      return roleName;
    } else {
      return roleName;
    }
  }

  urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  punchInFn() {
    this.workerAttendanceFlag.next(true);
  }

  punchOutFn() {
    this.workerAttendanceFlag.next(false);
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
