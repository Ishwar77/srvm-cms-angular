import { Component, OnInit, ViewChild, Pipe } from "@angular/core";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AppConstants } from "src/app/_helpers/app-constants";

import {
  AppMessagesEn
} from "src/app/_helpers/app-messages-en";
import { EventService } from "src/app/_services/event.service";
import { DateFormatService } from "src/app/_services/date-format.service";
import { Gallery } from "src/app/_models/gallery.model";
import { GalleryService } from "src/app/_services/gallery.service";
import { OwlCarousel } from "ngx-owl-carousel";
import { MatDialog } from "@angular/material/dialog";
import { DialogGalleryDetailsComponent } from "../dialog-gallery-details/dialog-gallery-details.component";
import { BannerService } from "src/app/_services/banner.service";
import { Banner } from "src/app/_models/banner";
import { Event } from "src/app/_models/event.model";
import { QuotesService } from "src/app/_services/quotes.service";
import { Quotes } from "src/app/_models/quotes";
import { GalleryCategory } from "src/app/_models/gallery-category";
import * as moment from "moment";
import { TestimonialsService } from "src/app/_services/testimonials.service";
import { Testimonials } from "src/app/_models/testimonials";
import { DomSanitizer } from "@angular/platform-browser";
import { DialogEventDetailsComponent } from "../dialog-event-details/dialog-event-details.component";


@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"]
})
@Pipe({ name: 'safe' })
export class UserHomeComponent implements OnInit {

  @ViewChild("owlElement") owlElement: OwlCarousel;
  autoPlay: false;
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session
  role: number = 0;
  userSession: any;
  checkUserSession: any;
  is_gig_worker: boolean;
  pageMobileSize: boolean;
  public innerWidth: any;
  // Object Related
  fgLogin: FormGroup;
  tabNumberArray = [0, 1]; // tabNumberArray
  tabNumber; // tabNumber

  eventList: Event[] = [];
  eventListUpcoming: Event[] = [];

  eventListCompleted: Event[] = [];

  galleryList: Gallery[] = [];
  images = [];
  bannerList: Banner[] = [];
  quotesList: Quotes[] = [];
  galleryCategory: GalleryCategory[] = [];
  selectedCategoryId: number;
  galleryObj = new Gallery();
  filterSelectedArrayDefault = [];
  filterSelectedArray = [];
  owl;
  todaydate = new Date();

  TestimonialsList: Testimonials[] = [];

  TestimonialsTotalDataCount;
  TestimonialsLimit = 0;
  TestimonialsCurrentPageno = 1;
  TestimonialsDetailsList: Testimonials;

  constructor(
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private dateFormatService: DateFormatService,
    private galleryService: GalleryService,
    public dialog: MatDialog,
    private bannerService: BannerService,
    private quotesService: QuotesService,
    private testimonialsService: TestimonialsService,
    private sanitizer: DomSanitizer
  ) {
    // // Auth Related
    // this.checkUserSession = this.authService.getUserData();
    // if (this.checkUserSession) {
    //   this.userSession = this.checkUserSession;
    //   this.role = this.userSession.role;
    //   this.authService.navigateToHome(this.role);
    // }
    // // App Related
    // this.AppMessages = AppMessagesEn;
    // this.PageMessages = LoginMessagesEn;
    this.AppMessages = AppMessagesEn;
  }

  ngOnInit() {
    // this.getLatestEventByUserHome();
    // this.getgalleryListByUserHome();
    this.getLatestEventByUserHomeUpcomingEventDate();
    this.getLatestEventByUserHomeCompletedEventDate();
    this.getBannerImageList();
    this.getquotaList();
    this.galleryCategoryList();
    this.getTestimonialsListByPageNo(1);
    this.innerWidth = window.innerWidth;
    // console.log(this.innerWidth);
    if (this.innerWidth < 780) {
      this.pageMobileSize = true;
    }
  }
  videosanitizer(value) {
    //return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  videosanitizerhtml(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  onChange() {
    //console.log("changed");
  }
  getTestimonialsListByPageNo(pageno: number) {
    this.getTestimonialsList(pageno);
  }
  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }

  getDate(date: Date) {
    var dateFormat = this.dateFormatService.formatDateTime(date);
    return dateFormat;
  }

  getLatestEventByUserHome() {
    this.eventService.getEventListByUserHome().subscribe(
      data => {
        const responseData = data;
        //console.log("data=====" + JSON.stringify(responseData));
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          this.eventList = responseData["data"] as Event[];
          // this.getStudentList();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getLatestEventByUserHomeUpcomingEventDate() {
    this.eventService.getEventListByUpcomingEventDate().subscribe(
      data => {
        const responseData = data;

        //console.log("upcoming List");
        // console.log("data=====" + JSON.stringify(responseData));
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          this.eventListUpcoming = responseData["data"] as Event[];
          // this.getStudentList();
          // console.log(this.eventListUpcoming.length);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getLatestEventByUserHomeCompletedEventDate() {
    this.eventService.getEventListByCompletedEventDate().subscribe(
      data => {
        const responseData = data;
        // console.log("completed List");
        //console.log("data=====" + JSON.stringify(responseData));

        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          this.eventListCompleted = responseData["data"] as Event[];
          // this.getStudentList();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ViewEventDetail() {
    this.router.navigateByUrl("/user_event_list");
  }

  ViewGalleryDetail() {
    this.router.navigateByUrl("/gallery_list");
  }

  // getgalleryListByUserHome() {
  //   this.galleryService.getGalleryListByUser().subscribe(
  //     data => {
  //       const responseData = data;
  //       console.log(responseData);
  //       //console.log("data=====" + JSON.stringify(responseData));
  //       let msg_code = responseData["status_code"];
  //       if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
  //         this.galleryList = responseData["data"] as Gallery[];
  //         // this.getStudentList();
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  // galleryCategoryList() {
  //   this.galleryService.getGalleryCategoryList().subscribe(
  //     data => {
  //       const responseData = data;
  //       console.log(responseData);
  //       this.galleryCategory = responseData["data"] as GalleryCategory[];
  //       if (this.galleryCategory) {
  //         for (let i = 0; i < this.galleryCategory.length; i++) {
  //           this.filterSelectedArray.push(this.galleryCategory[i].idcategory);
  //         }
  //         this.filterSelectedArrayDefault = JSON.parse(
  //           JSON.stringify(this.filterSelectedArray)
  //         );
  //         console.log(
  //           "Result------------------" + this.filterSelectedArrayDefault
  //         );
  //         this.getgalleryListByUserHome();
  //       }
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }
  galleryCategoryList() {
    this.galleryService.getGalleryListByUser().subscribe(
      data => {
        const responseData = data;
        //console.log("data===== gallery" + JSON.stringify(responseData));
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          this.galleryList = responseData["data"] as Gallery[];
          //console.log("++++++++++++++++gallery List++++++++++++++++++++++++++");
          // console.log(this.galleryList);

          for (let obj of this.galleryList) {
            obj.video_url = this.videosanitizer(obj.video_url);
          }
          // this.getStudentList();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  //   galleryFilterClickAll(galleryCategory) {
  //     var selectedArray = [];
  //     selectedArray = JSON.parse(JSON.stringify(this.filterSelectedArrayDefault));
  //     if (galleryCategory.isActive) {
  //       galleryCategory.isActive = false;
  //       this.getGalleryListByIds(this.filterSelectedArrayDefault);
  //       for (let i = 0; i < galleryCategory.length; i++) {
  //         galleryCategory[i].isActive = true;
  //         this.galleryFilterClick(galleryCategory[i]);
  //       }
  //     } else {
  //       galleryCategory.isActive = true;
  //       selectedArray.length = 0;
  //       this.getGalleryListByIds(selectedArray);
  //       for (let i = 0; i < galleryCategory.length; i++) {
  //         galleryCategory[i].isActive = false;
  //         this.galleryFilterClick(galleryCategory[i]);
  //       }
  //     }
  //   }
  //   galleryFilterClick(rowObj: GalleryCategory) {
  //     var filterUl = document.getElementsByClassName("filter-list");
  //     var filterUlLi = filterUl[0].getElementsByTagName("span");
  //     if (rowObj.isActive) {
  //       rowObj.isActive = false;
  //       this.filterSelectedArray.push(rowObj.idcategory);
  //       this.getGalleryListByIds(this.filterSelectedArray);
  //     } else {
  //       rowObj.isActive = true;
  //       var index = this.filterSelectedArray.indexOf(rowObj.idcategory);
  //       if (index > -1) {
  //         this.filterSelectedArray.splice(index, 1);
  //       }
  //       this.getGalleryListByIds(this.filterSelectedArray);
  //     }
  //   }

  //   getGalleryListByIds(categoryID) {
  //     this.galleryObj.category = categoryID;
  //     //console.log("FilterID AR----" + categoryID);

  //     this.galleryService.getGalleryListByIds(this.galleryObj).subscribe(
  //       data => {
  //         const responseData = data;
  //         // console.log(responseData);
  //         this.galleryList = responseData["data"] as Gallery[];
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  //   }
  fun() {
    this.owlElement.next([200]);
    this.owlElement.next([200]);
    //duration 200ms

    //Set AutoPlay to 3 seconds

    //   items: 4,
    //   itemsDesktop: [1199, 3],
    //   itemsDesktopSmall: [979, 3]
  }
  callback(event) {
    // Provided by the core
    var element = event.target; // DOM element, in this example .owl-carousel
    var name = event.type; // Name of the event, in this example dragged
    var namespace = event.namespace; // Namespace of the event, in this example owl.carousel
    var items = event.item.count; // Number of items
    var item = event.item.index; // Position of the current item
    // Provided by the navigation plugin
    var pages = event.page.count; // Number of pages
    var page = event.page.index; // Position of the current page
    var size = event.page.size; // Number of items per page
    //console.log("ffffffff");
  }
  openDialogEvent(rowObj) {
    const dialogRef = this.dialog.open(DialogEventDetailsComponent, {
      width: "95%",
      height: "95%",
      hasBackdrop: true,
      data: rowObj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getLatestEventByUserHome();
    });
  }

  openDialogGallery(galleryObj, index) {
    //  console.log(galleryObj);
    const dialogRef = this.dialog.open(DialogGalleryDetailsComponent, {
      width: "100%",
      height: "100%",
      hasBackdrop: true,
      data: { galleryObj: galleryObj, index: index }
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.getgalleryListByUserHome();
    });
  }

  getBannerImageList() {
    this.bannerService.getImage().subscribe(
      data => {
        const responseData = data;
        // console.log("data=====" + JSON.stringify(responseData));
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          this.bannerList = responseData["data"] as Banner[];

          // console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
          // console.log(this.bannerList);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getquotaList() {
    this.quotesService.getList().subscribe(
      data => {
        const responseData = data;
        //   console.log("data=====" + JSON.stringify(responseData));
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          this.quotesList = responseData["data"] as Quotes[];
          // console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
          // console.log(this.quotesList);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getTestimonialsList(pageno: number) {
    this.testimonialsService.getList(pageno, this.TestimonialsLimit).subscribe(
      data => {
        const responseData = data;
        //console.log("responseData" + JSON.stringify(responseData));
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
