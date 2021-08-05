import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { ValidationMessagesService } from "src/app/_utils/validation-messages/validation-messages.service";
import { ContactUs } from "src/app/_models/contact-us.model";
import { AppConstants } from "src/app/_helpers/app-constants";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { ContactUsService } from "src/app/_services/contact-us.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { MapsAPILoader } from "@agm/core";
import { MouseEvent as AGMMouseEvent } from "@agm/core";
import { MouseEvent } from "@agm/core";
import { COUNTRIESCODE } from "../student-save-or-update/countriescode";
import { Location } from '@angular/common';

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.css"]
})
export class ContactUsComponent implements OnInit {
  //country code
  countriescode: any = [];

  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;

  submitted = false;
  contactFG: FormGroup;
  id: number;
  contactUsObj: ContactUs = new ContactUs();

  title: string = "SVRM project";
  // latitude: number;
  // longitude: number;
  latitude: 12.947971;
  longitude: 77.565155;
  zoom: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private contactUsService: ContactUsService,
    private spinnerService: SpinnerService,
    private location: Location
  ) {
    this.AppMessages = AppMessagesEn;
    this.countriescode = COUNTRIESCODE;
  }

  ngOnInit(): void {
    this.formObj1FormValidate();
    //this.setCurrentLocation();
  }

  formObj1FormValidate() {
    this.contactFG = this.formBuilder.group({
      name: new FormControl(this.contactUsObj.name, [
        Validators.compose([
          Validators.required,

          Validators.maxLength(50),
          Validators.pattern(AppConstants.aplhaNumberic)
        ])
      ]),
      email: new FormControl(this.contactUsObj.email, [
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(AppConstants.emailPattern)
        ])
      ]),
      comment: new FormControl(this.contactUsObj.comment, [
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ]),
      mobile_number_code: new FormControl(this.contactUsObj.mobile_number, [
        Validators.compose([
          Validators.required,

        ])
      ]),
      mobile_number: new FormControl(this.contactUsObj.mobile_number, [
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100)
        ])
      ]),
      company: new FormControl(this.contactUsObj.company, [
        Validators.compose([Validators.required, Validators.maxLength(100)])
      ])
    });
  }

  saveFormObjSubmit() {
    this.authService.markFormGroupTouched(this.contactFG);
    if (this.contactFG.valid) {
      this.contactUsObj = this.contactFG.value;
      this.contactUsService.saveOrUpdate(this.contactUsObj).subscribe(
        data => {
          const responseData = data;
          if (
            responseData["status_code"] ===
            AppConstants.RESPONSE_STATUS_CODE_SUCCESS
          ) {

            //console.log("what happen")
            // Show Success Msg
            this.authService.showSuccessMsgFn(
              this.AppMessages.res_msg_status_success
            );
            //this.router.navigateByUrl('contact-us');
            location.reload();
          } else {
            // Show Warning Msg Notification
            this.authService.showWarningMsgFn(
              this.AppMessages.res_msg_status_error
            );
            // this.authService.showWarningMsgForLangPreferenceFn(responseData);
          }
          // Spinner Hide
          this.spinnerService.hide();
        },
        err => {
          // Spinner Hide
          this.spinnerService.hide();

          //   this.authService.showErrorMsgCommonFn(err);
        }
      );
    }
  }
}
