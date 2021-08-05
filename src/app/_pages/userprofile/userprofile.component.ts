import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AppConstants } from "src/app/_helpers/app-constants";
import { User } from "src/app/_models/user.model";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.css"]
})
export class UserprofileComponent implements OnInit {
  // User Session
  role: number = 0;
  userSession: any;
  checkUserSession: any;
  showLoginLinkFlag: boolean = false;
  // userObj: User[] = [];
  userObjFG: FormGroup;
  userObj: User;
  AppConstants: any = AppConstants;
  AppMessages: any;
  id: number;
  // UserDetailsList: User;
  userid = 0;
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
          this.id = this.userSession.iduser;
          this.role = this.userSession.role;
          // this.setProfilePic();
          this.getUserList(this.id);
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
  ngOnInit(): void { }

  getUserList(id) {
    this.userService.getById(id).subscribe(
      data => {
        //  console.log(this.userSession);
        // this.statusImageUpload = true;
        // this.passwordInput = true;
        const responseData = data as any;
        // console.log("-----44444444444444444444444");
        // console.log(data);
        this.userObj = responseData["data"] as User;
        //  console.log("-----4564564514");
        //  console.log(this.userObj);
        // this.userObjFG.patchValue(this.userObj);
        // this.getStudentImageById(id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      err => {
        console.log(err);
        // Spinner Hide
        this.spinnerService.hide();

        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }
}
