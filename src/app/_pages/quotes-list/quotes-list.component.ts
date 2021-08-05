import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { AppConstants } from "src/app/_helpers/app-constants";
import { Quotes } from "src/app/_models/quotes";
import { QuotesService } from "src/app/_services/quotes.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";

@Component({
  selector: "app-quotes-list",
  templateUrl: "./quotes-list.component.html",
  styleUrls: ["./quotes-list.component.css"]
})
export class QuotesListComponent implements OnInit {
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session

  quotesList: Quotes[] = [];

  buttonDiasable: boolean = false;

  imageToSave = "";
  imageToShow: any;
  isImageLoading: boolean;

  galleryTotalDataCount;
  galleryLimit = 0;
  galleryCurrentPageno = 1;

  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private quotesService: QuotesService,
    private authenticationService: AuthenticationService
  ) {
    this.AppMessages = AppMessagesEn;
  }

  ngOnInit() {
    this.getquotaList();
  }
  openSaveUpdateDialog() {
    this.router.navigateByUrl("/Quotes");
  }
  getquotaList() {
    this.quotesService.getList().subscribe(
      data => {
        const responseData = data;
        //  console.log("data=====" + JSON.stringify(responseData));
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          this.quotesList = responseData["data"] as Quotes[];
          //  console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
          //  console.log(this.quotesList);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  activateConfirmFn(idquotes: number) {
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
            this.deleteQuotes(idquotes);
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

  deleteQuotes(idquotes) {
    this.quotesService.delete(idquotes).subscribe(
      data => {
        const responseData = data;
        // console.log("data=====" + responseData);
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as Quotes;
          this.getquotaList();
          this.authenticationService.showSuccessMsgFn(
            this.AppMessages.delete_label1
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
