import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { AppConstants } from "src/app/_helpers/app-constants";
import {
  AppMessagesEn,
  LoginMessagesEn
} from "src/app/_helpers/app-messages-en";
import { Router } from "@angular/router";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  animations: [
    trigger("enterAnimation", [
      transition(":enter", [
        style({ transform: "translateX(100%)", opacity: 0 }),
        animate("300ms", style({ transform: "translateX(0)", opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session
  role: number = 0;
  userSession: any;
  checkUserSession: any;
  is_gig_worker: boolean;
  // Object Related
  fgLogin: FormGroup;
  tabNumberArray = [0, 1]; // tabNumberArray
  tabNumber; // tabNumber
  constructor(
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Auth Related
    this.checkUserSession = this.authService.getUserDataOnly();
    if (this.checkUserSession) {
      this.userSession = this.checkUserSession;
      this.role = this.userSession.role;
      //   console.log("%%%%%%%%%%%%%login");
      //   console.log(this.role);
      //   this.authService.navigateToHome(this.role);
      this.router.navigate(["/admin"]);
    }
    // App Related
    this.AppMessages = AppMessagesEn;
    this.PageMessages = LoginMessagesEn;
  }

  ngOnInit() {
    this.fgLoginValidatorsFn();
  }

  fgLoginValidatorsFn() {
    this.fgLogin = this.formBuilder.group({
      username: new FormControl("", [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      password: new FormControl("", [
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(15),
          Validators.required
        ])
      ])
    });
  }

  fgLoginSubmitFn() {
    this.authService.markFormGroupTouched(this.fgLogin);
    if (this.fgLogin.valid) {
      // Spinner Show
      this.spinnerService.show();

      var authData = {
        username: this.fgLogin.controls.username.value,
        password: this.fgLogin.controls.password.value
      };

      this.fgLogin.controls.password.setValue("");

      this.authService.login(authData).subscribe(
        data => {
          const responseData = data;
          this.router.navigate(["/admin"]);
          this.userSession = this.authService.getUserData();

          //   this.userRoleId = this.userSession.role;
          // console.log(responseData);
          if (
            responseData["status_code"] !=
            AppConstants.RESPONSE_STATUS_CODE_ALREADY_REPORTED
          ) {
            this.authService.reloadPage();
          } else {
            // Show Warning Msg Notification
            this.authService.showWarningMsgFn(
              this.PageMessages.LOGIN_PASSWORD_MSG_ERROR
            );
            // this.authService.showWarningMsgForLangPreferenceFn(responseData);
          }

          this.fgLogin.reset();
          this.spinnerService.hide();
        },
        err => {
          //this.fgLogin.reset();
          // Hide Spinner
          this.spinnerService.hide();
          // Error Msg
          // this.authService.showErrorMsgFn(
          //   this.PageMessages.LOGIN_MOBILE_NUMBER_MSG_ERROR
          // );
          //console.log(err.error.message);
          if (err.error.message.includes("Mobile number does not exist")) {
            this.authService.showErrorMsgFn(
              this.PageMessages.LOGIN_MOBILE_NUMBER_MSG_ERROR
            );
          } else if (err.error.message.includes("incorrect password")) {
            this.authService.showErrorMsgFn(
              this.PageMessages.LOGIN_PASSWORD_MSG_ERROR
            );
          } else if (err.error.message.includes("Login attempts")) {
            this.authService.showErrorMsgFn(
              this.PageMessages.LOGIN_MAX_ATTEMPTS_MSG_ERROR
            );
            this.tabSwitchFn(1);
          }
        }
      );
    }
  }
  tabSwitchFn(tabNumber) {
    if (tabNumber === this.tabNumberArray[0]) {
      this.tabNumber = tabNumber;
    } else if (tabNumber === this.tabNumberArray[1]) {
      this.tabNumber = tabNumber;
    }
  }

  registrationLinkClickFn() {
    // this.authService.removeTokenOnly();
    // this.router.navigate(['user/register']);
  }
}
