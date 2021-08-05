import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { EventService } from "src/app/_services/event.service";
import { DateFormatService } from "src/app/_services/date-format.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { Event } from "src/app/_models/event.model";
import * as moment from "moment";

@Component({
  selector: "app-user-event-list",
  templateUrl: "./user-event-list.component.html",
  styleUrls: ["./user-event-list.component.css"]
})
export class UserEventListComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;

  EventList: Event[] = [];
  buttonDiasable: boolean = false;

  eventTotalDataCount;
  eventLimit = 0;
  eventCurrentPageno = 1;

  // UI Tabs
  tabNumberArray = [0, 1, 2, 3];
  tabNumber;

  // Flags
  distRightsFlag: boolean = false;

  todaydate = new Date();
  public showUploadButton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private eventService: EventService,
    private dateFormatService: DateFormatService
  ) {
    this.AppMessages = AppMessagesEn;
  }

  ngOnInit() {
    this.getEventList(1);
    //this.getDateCompare();
  }

  getEventList(pageno: number) {
    this.eventService.getEventListByUser(pageno, this.eventLimit).subscribe(
      data => {
        const responseData = data;
        //  console.log("responseData");
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          //   this.EventList = responseData["data"] as Event[];

          let listData = responseData["data"];
          //   console.log(listData);
          if (listData) {
            this.EventList = listData["result"] as Event[];
            this.eventTotalDataCount = listData["count"];
            this.eventLimit = listData["limit"];
            this.eventCurrentPageno = +listData["pageno"];
          }
          this.buttonDiasable = false;
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

  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }

  getDate(date: Date) {
    var dateFormat = this.dateFormatService.formatDateTime(date);
    return dateFormat;
  }

  ViewEventsDetail(idevent: any) {
    let url: string = "/eventOverview/" + idevent;
    this.router.navigateByUrl(url);
  }

  getDateCompare(start_date) {
    var dateFormat = this.dateFormatService.formatTimeHH_mm(this.todaydate);
    let date: Date = moment(dateFormat).toDate();
    let date2: Date = moment(start_date).toDate();
    // var dateString = this.dateFormatService.parseDate(dateFormat);
    // var dateString1 = this.dateFormatService.parseDate(start_date);
    // var dateFormat2 = this.dateFormatService.formatTimeHH_mm(start_date);
    // console.log(date + "gdfgdfgdfgformattttt" + date2);
    if (date > date2) {
      // console.log("true");
      return false;
    } else {
      // console.log("false");
      return true;
    }
  }
}
