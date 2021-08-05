import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import {
  AppMessagesEn,
  ChangePasswordMessagesEn
} from "src/app/_helpers/app-messages-en";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/_models/user.model";
import { Location } from "@angular/common";
import { ValidationMessagesService } from "src/app/_utils/validation-messages/validation-messages.service";
import { ChangePasswordService } from "src/app/_services/change-password.service";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.css"]
})
export class ChangePasswordComponent implements OnInit {
  AppConstants: any = AppConstants;
  userObj2FG: FormGroup;
  userObjChangePassword: User = new User();
  AppMessages: any;
  PageMessages: any;
  // Object Related
  updateFlag: boolean = false;
  tabNumberArray = [0, 1]; // tabNumberArray
  tabNumber; // tabNumber
  userObj1FG: FormGroup;

  // userObj: User = new User();

  studentid = 0;
  role: number = 0;
  userSession: any;
  checkUserSession: any;
  is_gig_worker: boolean;
  iduser: number = 0;

  constructor(
    private authenticationService: AuthenticationService,
    private spinnerService: SpinnerService,
    private changePasswordService: ChangePasswordService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private authService: AuthenticationService
  ) {
    this.checkUserSession = this.authService.getUserData();
    this.userSession = this.checkUserSession;
    this.role = this.userSession.role;
    this.iduser = this.userSession.iduser;
    // this.authService.navigateToHome(this.role);
    this.userObjChangePassword.iduser = this.iduser;

    // App Related
    this.AppMessages = AppMessagesEn;
    this.PageMessages = ChangePasswordMessagesEn;
  }

  ngOnInit() {
    this.formObj2FormValidate();
  }
  formObj2FormValidate() {
    this.userObj2FG = this.formBuilder.group(
      {
        old_password: new FormControl("", [
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(16)
          ])
        ]),
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

  saveFormObj2Submit() {
    this.authenticationService.markFormGroupTouched(this.userObj2FG);
    if (
      this.userObj2FG.valid
      //&&
      //   (this.userObjChangePassword.iduser &&
      //     this.userObjChangePassword.iduser > 0)
    ) {
      this.spinnerService.show();

      this.userObjChangePassword = this.userObj2FG.value;
      this.changePasswordService
        .changePassword(this.userObjChangePassword)
        .subscribe(
          data => {
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
              this.userObj2FG.reset();
              // Spinner Hide
              this.spinnerService.hide();
            }
            // Spinner Hide
            this.spinnerService.hide();
          },
          err => {
            // Spinner Hide
            this.spinnerService.hide();
            this.userObj2FG.reset();

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
  onCancel() {
    this.router.navigateByUrl("");
  }
}
