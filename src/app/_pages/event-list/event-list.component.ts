import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { EventService } from "src/app/_services/event.service";
import { DateFormatService } from "src/app/_services/date-format.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { ImagePopupComponent } from "../image-popup/image-popup.component";
import { Event } from "src/app/_models/event.model";

// export interface DialogData {
//   event_name: string;
//   profile_image: string;
//}
@Component({
  selector: "app-event-list",
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.css"]
})
export class EventListComponent implements OnInit {
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
  event_name: string;
  profile_image: string;
  // Flags
  distRightsFlag: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private eventService: EventService,
    private dateFormatService: DateFormatService,
    public dialog: MatDialog
  ) {
    this.AppMessages = AppMessagesEn;
  }

  ngOnInit() {
    this.tabSwitchFn(this.tabNumberArray[1]);
  }

  tabSwitchFn(tabNumber) {
    if (tabNumber === this.tabNumberArray[0]) {
      this.tabNumber = tabNumber;
      this.geteventListByPublished(1);
    } else if (tabNumber === this.tabNumberArray[1]) {
      this.tabNumber = tabNumber;
      this.geteventListByCurrentlyRunning(1);
    } else if (tabNumber === this.tabNumberArray[2]) {
      this.tabNumber = tabNumber;
      this.geteventListByDeleted(1);
    } else if (tabNumber === this.tabNumberArray[3]) {
      this.tabNumber = tabNumber;
      this.geteventListByCompleted(1);
    }
  }

  geteventListByPublished(pageno: number) {
    this.getEventList(pageno);
  }

  geteventListByCurrentlyRunning(pageno: number) {
    this.currentlyRunning(pageno);
  }

  geteventListByDeleted(pageno: number) {
    this.deletedEventList(pageno);
  }

  geteventListByCompleted(pageno: number) {
    this.completedEventList(pageno);
  }

  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }

  getEventList(pageno: number) {
    this.eventService.getList(pageno, this.eventLimit).subscribe(
      data => {
        const responseData = data;
        //   console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          //   this.EventList = responseData["data"] as Event[];

          let listData = responseData["data"];
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

  deletedEventList(pageno: number) {
    //  console.log("delted");
    this.eventService.deletedEvent(pageno, this.eventLimit).subscribe(
      data => {
        const responseData = data;
        // console.log("responseData  Deleted" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          //   this.EventList = responseData["data"] as Event[];
          //  this.buttonDiasable = true;
          // }
          let listData = responseData["data"];
          if (listData) {
            this.EventList = listData["result"] as Event[];
            // console.log(this.EventList);
            this.eventTotalDataCount = listData["count"];
            this.eventLimit = listData["limit"];
            this.eventCurrentPageno = +listData["pageno"];
          }
          this.buttonDiasable = true;
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
  currentlyRunning(pageno: number) {
    this.eventService.eventListByDate(pageno, this.eventLimit).subscribe(
      data => {
        const responseData = data;
        //  console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          //   this.EventList = responseData["data"] as Event[];
          //this.buttonDiasable = false;

          let listData = responseData["data"];
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

  completedEventList(pageno: number) {
    this.eventService.eventListByStartate(pageno, this.eventLimit).subscribe(
      data => {
        const responseData = data;
        //console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          //   this.EventList = responseData["data"] as Event[];
          //this.buttonDiasable = true;

          let listData = responseData["data"];
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

  openSaveUpdateDialog() {
    this.router.navigateByUrl("/eventSave/new");
  }

  activateConfirmFn(idevent: number) {
    // this.buttonDiasable = true;
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
            this.deleteEvent(idevent);
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

  deleteEvent(idevent) {
    this.eventService.delete(idevent).subscribe(
      data => {
        const responseData = data;
        // console.log("data=====" + responseData);
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as Event;
          //this.getEventList();
          // this.router.navigate(["/studentList"]);
          // this.geteventListByPageNo(1);
          // this.geteventListByCurrentlyRunning(1);
          this.tabSwitchFn(this.tabNumber);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ViewEventsDetail(idevent: any) {
    let url: string = "/eventOverview/" + idevent;
    this.router.navigateByUrl(url);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImagePopupComponent, {
      width: "500px"
    });

    dialogRef.afterClosed().subscribe(result => {
      //  console.log("The dialog was closed");
      // data: {
      //   profile_image: this.profile_image;
      // }
      this.tabSwitchFn(this.tabNumber);
    });
  }
}
