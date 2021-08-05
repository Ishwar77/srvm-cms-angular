import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { User } from "src/app/_models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { UserService } from "src/app/_services/user.service";
import { ValidationMessagesService } from "src/app/_utils/validation-messages/validation-messages.service";

@Component({
  selector: "app-user-save-update",
  templateUrl: "./user-save-update.component.html",
  styleUrls: ["./user-save-update.component.css"]
})
export class UserSaveUpdateComponent implements OnInit {
  AppConstants: any = AppConstants;
  AppMessages: any;
  id: number;
  userid = 0;
  // passwordInput: boolean = false;

  userObjFG: FormGroup;
  userObj: User = new User();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private userService: UserService
  ) {
    this.AppMessages = AppMessagesEn;
    this.route.params.subscribe(params => {
      if (params.iduser === 0) {
        this.userid = params.iduser;
        this.userObj.iduser = this.userid;
      } else if (params.iduser > 0) {
        this.userid = params.iduser;
        this.userObj.iduser = this.userid;
        this.getUserByid(this.userObj.iduser);
      }
    });
  }

  ngOnInit(): void {
    this.formObj1FormValidate();
  }
  formObj1FormValidate() {
    this.userObjFG = this.formBuilder.group(
      {
        first_name: new FormControl(this.userObj.first_name, [
          Validators.compose([
            Validators.required,

            Validators.maxLength(50),
            Validators.pattern(AppConstants.aplhaNumberic)
          ])
        ]),
        last_name: new FormControl(this.userObj.last_name, [
          Validators.compose([
            Validators.required,

            Validators.maxLength(50),
            Validators.pattern(AppConstants.aplhaNumberic)
          ])
        ]),
        // role: new FormControl(this.userObj.role, [
        //   Validators.compose([Validators.required])
        // ]),

        dob: new FormControl(this.userObj.dob, [
          Validators.compose([
            Validators.required,
            Validators.maxLength(50)
            //   Validators.minLength(2),
            //   Validators.maxLength(100)
          ])
        ]),
        cell_number: new FormControl(this.userObj.cell_number, [
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(AppConstants.CELL_NUMBER_PATTERN)
          ])
        ]),
        gender: new FormControl(this.userObj.gender, [
          Validators.compose([Validators.required])
        ]),

        email: new FormControl(this.userObj.email, [
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(AppConstants.emailPattern)
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
  // checkClicked(event) {
  //   let residentialaddresses = this.userObjFG.controls.address_one.value;
  //   this.userObjFG.controls.address_two.setValue(residentialaddresses);
  // }
  saveFormUserSubmit() {
    this.authService.markFormGroupTouched(this.userObjFG);
    if (this.userObjFG.valid) {
      this.userObj = this.userObjFG.value;
      this.userObj.iduser = this.userid;
      this.userService.saveOrUpdate(this.userObj).subscribe(
        data => {
          // console.log("data sendi request body" + JSON.stringify(data));
          const responseData = data;
          //  console.log("data" + JSON.stringify(responseData));

          if (
            responseData["status_code"] ===
            AppConstants.RESPONSE_STATUS_CODE_SUCCESS
          ) {
            // Show Success Msg
            this.authService.showSuccessMsgFn(
              this.AppMessages.res_msg_status_success
            );
            // this.authService.showSuccessMsgCommonFn(responseData);
            this.userObjFG.reset();
            // this.getUserByid(this.userid);
            this.goBack();
            // this.router.navigate(["/studentList"]);
          } else {
            // Show Warning Msg Notification
            this.authService.showWarningMsgFn(
              this.AppMessages.res_msg_status_error
            );
            // this.authService.showWarningMsgForLangPreferenceFn(responseData);
          }
          // Spinner Hide
          this.spinnerService.hide();

          // this.router.navigate(['/user/login']);
        },
        err => {
          // Spinner Hide
          this.spinnerService.hide();
          this.authService.showErrorMsgCommonFn(err);
        }
      );
    }
  }

  getUserByid(id) {
    this.userService.getById(id).subscribe(
      data => {
        // this.statusImageUpload = true;
        // this.passwordInput = true;
        const responseData = data;
        this.userObj = responseData["data"] as User;
        this.removePassword(this.userObj);
        this.userObjFG.patchValue(this.userObj);
        // this.getStudentImageById(id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(error);
      }
    );
  }
  removePassword(userObj: User): User {
    userObj.password = null;
    userObj.confirm_password = null;
    userObj.old_password = null;
    return userObj;
  }
  onCancelUserForm(userObjFG: FormGroup) {
    this.userObj = new User();
    this.onCancel(userObjFG);
  }

  onCancel(formGroupToCancel: FormGroup) {
    this.userObjFG.reset();
    this.goBack();
  }

  goBack() {
    // if (this.userid == 0) {
    this.router.navigate(["/userList"]);
    // } else {
    // let url: string = "/userList/" + this.userid;
    //  this.router.navigateByUrl(url);
    //}
  }
}
