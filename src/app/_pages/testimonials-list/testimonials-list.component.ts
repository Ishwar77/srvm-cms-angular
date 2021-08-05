import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AppMessagesEn, UserList } from "src/app/_helpers/app-messages-en";
import { Testimonials } from "src/app/_models/testimonials";
import { TestimonialsService } from "src/app/_services/testimonials.service";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: "app-testimonials-list",
  templateUrl: "./testimonials-list.component.html",
  styleUrls: ["./testimonials-list.component.css"]
})
export class TestimonialsListComponent implements OnInit {
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session

  TestimonialsList: Testimonials[] = [];

  TestimonialsTotalDataCount;
  TestimonialsLimit = 0;
  TestimonialsCurrentPageno = 1;
  TestimonialsDetailsList: Testimonials;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private testimonialsService: TestimonialsService,
    private _sanitizationService: DomSanitizer,
  ) {
    this.AppMessages = AppMessagesEn;
    this.PageMessages = UserList;
  }

  ngOnInit() {
    this.getTestimonialsListByPageNo(1);
  }

  videosanitizer(value) {
    return this._sanitizationService.bypassSecurityTrustHtml(value);
  }


  getTestimonialsListByPageNo(pageno: number) {
    this.getTestimonialsList(pageno);
  }

  getTestimonialsList(pageno: number) {
    this.testimonialsService.getList(pageno, this.TestimonialsLimit).subscribe(
      data => {
        const responseData = data;
        //  console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.TestimonialsList = listData["result"] as Testimonials[];
            this.TestimonialsTotalDataCount = listData["count"];
            this.TestimonialsLimit = listData["limit"];
            this.TestimonialsCurrentPageno = +listData["pageno"];
          }
        } else {
          // Show Warning Msg Notification
          this.authService.showWarningMsgCommonFn(responseData);
        }
        this.spinnerService.hide();
      },
      err => {
        console.log(err);
        // Spinner Hide
        this.spinnerService.hide();

        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  openSaveUpdateDialog() {
    this.router.navigateByUrl("/testimonials_save_update");
  }
  activateConfirmFn(idtestimonials: number) {
    let confirmTitle = this.AppMessages.label_data_delete;
    let confirmBody = this.AppMessages.are_you_sure_want_to_delete;
    this.snotifyService.confirm(confirmBody, confirmTitle, {
      position: SnotifyPosition.centerCenter,
      closeOnClick: false,
      pauseOnHover: true,
      backdrop: 0.5,
      buttons: [
        {
          text: this.AppMessages.yes_label,
          action: toast => {
            this.deleteUser(idtestimonials);
            this.snotifyService.remove(toast.id);
          },
          bold: true
        },
        {
          text: this.AppMessages.no_label,
          action: toast => {
            this.snotifyService.remove(toast.id);
          },
          bold: false
        }
      ]
    });
  }

  deleteUser(idtestimonials) {
    this.testimonialsService.delete(idtestimonials).subscribe(
      data => {
        const responseData = data;

        let msg_code = responseData["status_code"];

        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as Testimonials;
          //this.getUserList(pageno);
          // console.log("data=====" + msg_code);
          // this.router.navigate(["/userList"]);
          // this.router
          //   .navigateByUrl("/RefrshComponent", { skipLocationChange: true })
          //   .then(() => this.router.navigate(["/userList"]));
          this.ngOnInit();
          // Show Success Msg
          this.authService.showSuccessMsgFn(
            this.AppMessages.testimonial_msg_delete
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
