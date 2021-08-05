import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EventService } from "src/app/_services/event.service";
import { Event } from "src/app/_models/event.model";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { AppConstants } from "src/app/_helpers/app-constants";
import { DateFormatService } from "src/app/_services/date-format.service";
import { Location } from "@angular/common";
import { OwlCarousel } from "ngx-owl-carousel";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: "app-event-details-overview",
  templateUrl: "./event-details-overview.component.html",
  styleUrls: ["./event-details-overview.component.css"]
})
export class EventDetailsOverviewComponent implements OnInit {
  @ViewChild("owlElement") owlElement: OwlCarousel;
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  id: number;
  isImageOpen = false;

  imgId: number = 1;

  eventObjFG: FormGroup;
  userObj2FG: FormGroup;
  eventList: Event;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private dateFormatService: DateFormatService,
    private _location: Location,
    private _sanitizationService: DomSanitizer,
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idevent === 0) {
        this.id = params.idevent;
      } else if (params.idevent > 0) {
        this.id = params.idevent;
        this.getEventByid(this.id);
      }
    });
  }

  ngOnInit() { }

  getEventByid(id) {
    this.eventService.getById(id).subscribe(
      data => {
        const responseData = data;
        // console.log("$$$$$$$$$$$$");
        // console.log(responseData);
        this.eventList = responseData["data"] as Event;
      },
      error => {
        console.log(error);
      }
    );
  }

  videosanitizer(value) {
    return this._sanitizationService.bypassSecurityTrustHtml(value);
  }

  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }
  onNoClick(): void {
    this._location.back();
  }
  fun() {
    this.owlElement.next([200]);
    //duration 200ms

    //Set AutoPlay to 3 seconds

    //   items: 4,
    //   itemsDesktop: [1199, 3],
    //   itemsDesktopSmall: [979, 3]
  }
  showEventImage(imgId) {
    this.imgId = imgId;
  }
}
