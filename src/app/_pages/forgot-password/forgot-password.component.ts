import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "../../_helpers/app-constants";

import { SpinnerService } from "../../_utils/spinner/spinner.service";
import { AuthenticationService } from "../../_services/authentication.service";

import { User } from "../../_models/user.model";

import { ValidationMessagesService } from "../../_utils/validation-messages/validation-messages.service";
import {
  AppMessagesEn,
  AppMenuMessagesEn
} from "src/app/_helpers/app-messages-en";
import { ChangePasswordService } from "src/app/_services/change-password.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  //App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  // User Session
  userRoleId: number = 0;
  userSession: any;
  // Object Related

  forgotPasswordFG: FormGroup;
  validateOTPFG: FormGroup;
  changePasswordFG: FormGroup;
  tabNumberArray = [0, 1]; // tabNumberArray
  tabNumber; // tabNumber
  // Arrays

  isOtpRequestSent = false;
  isOtpVerified = false;
  userObj: User = new User();
  userObjOTPVerification: User = new User();
  userObjChangePassword: User = new User();
  PageMessages: any;

  constructor(
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private changePasswordService: ChangePasswordService
  ) {
    // const checkUserSessionFlag = this.authenticationService.checkUserSession();
    // if (checkUserSessionFlag === true) {
    //   this.userSession = this.authenticationService.getUserData();
    //   this.userRoleId = this.userSession.role;
    // this.naviagteToDashBoard();
    //}
    //App Related
    this.AppMessages = AppMessagesEn;
    this.PageMessages = AppMenuMessagesEn;
  }

  ngOnInit() {
    this.vailidateForgotPasswordFormFn();
    this.vailidateOTPFormFn();
    this.vailidateChangepasswordFormFn();
  }

  vailidateForgotPasswordFormFn() {
    this.forgotPasswordFG = this.formBuilder.group({
      email: new FormControl("", [
        Validators.compose([
          Validators.maxLength(50),
          Validators.pattern(AppConstants.emailPattern),
          Validators.required
        ])
      ])
    });
  }

  forgotPasswordFormSubmiFn() {
    if (this.forgotPasswordFG.valid) {
      // Spinner Show
      this.spinnerService.show();

      this.authenticationService.forgotPassword(this.userObj).subscribe(
        data => {
          const responseData = data;

          if (
            responseData["status_code"] ===
            AppConstants.RESPONSE_STATUS_CODE_SUCCESS
          ) {
            // Show Success Msg
            this.authenticationService.showSuccessMsgFn(
              this.PageMessages.otp_sent_success_message
            );
            // this.authenticationService.showSuccessMsgCommonFn(responseData);

            this.userObjOTPVerification = JSON.parse(
              JSON.stringify(this.userObj)
            );
            this.forgotPasswordFG.reset();
            this.isOtpRequestSent = true;
          } else {
            // Show Warning Msg Notification
            // this.authenticationService.showWarningMsgFn(this.AppMessages.otp_sent_failure_message);
            this.authenticationService.showWarningMsgFn(
              this.PageMessages.otp_sent_failure_message
            );
          }
          // Spinner Hide
          this.spinnerService.hide();
        },
        err => {
          // Spinner Hide
          this.spinnerService.hide();
          this.authenticationService.showErrorMsgFn(
            this.PageMessages.RESPONSE_STATUS_MSG_ERROR
          );
        }
      );
    }
  }

  vailidateOTPFormFn() {
    this.validateOTPFG = this.formBuilder.group({
      otp_code: new FormControl("", [
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.required
        ])
      ])
    });
  }

  resendOTP() {
    this.authenticationService.resendOTP(this.userObjOTPVerification).subscribe(
      data => {
        const responseData = data;
        //  console.log(responseData);
        if (
          responseData["msgCode"] === AppConstants.RESPONSE_STATUS_CODE_SUCCESS
        ) {
          // Show Success Msg
          this.authenticationService.showSuccessMsgFn(
            this.AppMessages.otp_resent_success_message
          );
          // this.authenticationService.showSuccessMsgCommonFn(responseData);

          this.forgotPasswordFG.reset();
          this.isOtpRequestSent = true;
        } else {
          // Show Warning Msg Notification
          // this.authenticationService.showWarningMsgFn(this.AppMessages.otp_resent_failure_message);
          this.authenticationService.showWarningMsgFn(
            this.PageMessages.otp_sent_failure_message
          );
        }
        // Spinner Hide
        this.spinnerService.hide();
      },
      err => {
        // Spinner Hide
        this.spinnerService.hide();
        this.authenticationService.showErrorMsgFn(
          this.PageMessages.RESPONSE_STATUS_MSG_ERROR
        );
      }
    );
  }

  vailidateOTPFormSubmiFn() {
    if (this.validateOTPFG.valid) {
      // Spinner Show
      this.spinnerService.show();

      this.authenticationService
        .verifyOTP(this.userObjOTPVerification)
        .subscribe(
          data => {
            const responseData = data;

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              // Show Success Msg
              this.authenticationService.showSuccessMsgFn(
                this.PageMessages.otp_verify_success_message
              );
              // this.authenticationService.showSuccessMsgCommonFn(responseData);

              this.userObjChangePassword = JSON.parse(
                JSON.stringify(this.userObjOTPVerification)
              );
              this.isOtpVerified = true;
            } else {
              // Show Warning Msg Notification
              this.authenticationService.showWarningMsgFn(
                this.PageMessages.otp_verify_failure_message
              );
              // this.authenticationService.showWarningMsgCommonFn(responseData);
            }
            this.validateOTPFG.reset();
            // Spinner Hide
            this.spinnerService.hide();
          },
          err => {
            // Hide Spinner
            this.validateOTPFG.reset();
            this.spinnerService.hide();
            // Show Error Msg
            // console.log(err);
            this.authenticationService.showErrorMsgFn(
              this.PageMessages.RESPONSE_STATUS_MSG_ERROR
            );
          }
        );
    }
  }

  vailidateChangepasswordFormFn() {
    this.changePasswordFG = this.formBuilder.group(
      {
        password: new FormControl("", [
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16)
          ])
        ]),
        confirm_password: new FormControl("", [
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16)
          ])
        ])
      },
      {
        validator: ValidationMessagesService.checkPasswordsMatch(
          "password",
          "confirm_password"
        )
      }
    );
  }

  changePasswordFormSubmiFn() {
    this.authenticationService.markFormGroupTouched(this.changePasswordFG);
    if (
      this.changePasswordFG.valid
      //&&
      //   (this.userObjChangePassword.iduser &&
      //     this.userObjChangePassword.iduser > 0)
    ) {
      this.spinnerService.show();
      // console.log("111111111");
      /// this.userObjChangePassword.iduser = this.iduser;
      //console.log("111111111222222" + this.userObjChangePassword.iduser);
      // this.userObjChangePassword = this.changePasswordFG.value;
      this.authenticationService
        .changePassword(this.userObjChangePassword)
        .subscribe(
          data => {
            // console.log(data);
            //const responseData = data as User;
            const responseData = data;

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.authenticationService.showSuccessMsgFn(
                this.PageMessages.password_updated_success_message
              );
              // this.authService.showSuccessMsgCommonFn(responseData);
              // if (this.admRightsFlag || this.empRightsFlag) {
              //   this.navigateToListPage();
              // } else {
              //   // this.authService.logout();
              // }

              //  Remove Token
              this.authenticationService.removeToken();
            } else {
              // Show Warning Msg Notification
              this.authenticationService.showWarningMsgFn(
                this.PageMessages.RESPONSE_STATUS_MSG_ERROR
              );

              // this.authenticationService.showWarningMsgCommonFn(responseData);
              this.changePasswordFG.reset();
              // Spinner Hide
              this.spinnerService.hide();
            }
            // Spinner Hide
            this.spinnerService.hide();
          },
          err => {
            // Spinner Hide
            this.spinnerService.hide();
            this.changePasswordFG.reset();

            if (
              err.error.status_code ===
              AppConstants.RESPONSE_STATUS_CODE_UNAUTHORIZE
            ) {
              // Show Error Msg Notification

              this.authenticationService.logout();
            } else {
              // Show Warning Msg Notification
            }
            this.authenticationService.showErrorMsgCommonFn(err);
          }
        );
    }
  }

  cancelFn() {
    // window.location.reload();
    this.router.navigate(["/login"]);
  }

  cancelVerifyFn() {
    this.validateOTPFG.reset();
    this.isOtpRequestSent = false;
  }
}
