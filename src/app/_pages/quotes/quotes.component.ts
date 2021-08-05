import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { Quotes } from "src/app/_models/quotes";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { QuotesService } from "src/app/_services/quotes.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";

@Component({
  selector: "app-quotes",
  templateUrl: "./quotes.component.html",
  styleUrls: ["./quotes.component.css"]
})
export class QuotesComponent implements OnInit {
  AppConstants: any = AppConstants;
  AppMessages: any;
  imageToSave = "";
  imageChangedEvent: any = "";
  statusOpenImageDialog = false;
  imageSetForUpdateChanged = false;
  statusFormUpdating: boolean = false;
  activeFormNo = 1;
  statusImageUpload: boolean = false;
  fileSize;
  imageFormatArray: string[] = Object.values(AppConstants.imageFileFormats);
  fileValidStatus: boolean = false;
  prevoiusAdvertuserUrl: string;
  id: number = 0;
  //date
  SpeciedInputField: boolean = true;

  updateButton: boolean = false;
  //html data
  quotesObjFG: FormGroup;
  quotesObj: Quotes = new Quotes();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private quotesService: QuotesService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idquotes === 0) {
        this.id = params.idquotes;
        this.quotesObj.idquotes = this.id;
        // this.eventObj.idquotes = this.id;
      } else if (params.idquotes > 0) {
        this.id = params.idquotes;
        this.quotesObj.idquotes = this.id;
        //this.eventObj.idquotes = this.id;
        this.getQuotesByid(this.id);
      }
    });
  }

  ngOnInit() {
    this.formObj1FormValidate();
  }
  formObj1FormValidate() {
    this.quotesObjFG = this.formBuilder.group({
      name: new FormControl(this.quotesObj.name, [
        Validators.compose([
          Validators.required,

          Validators.maxLength(50)
          //  Validators.pattern(AppConstants.aplhaNumberic)
        ])
      ]),

      text: new FormControl(this.quotesObj.text, [
        Validators.compose([Validators.required, Validators.maxLength(500)])
      ])
    });
  }

  getQuotesByid(id) {
    this.quotesService.getById(id).subscribe(
      data => {
        this.statusImageUpload = true;
        this.updateButton = true;
        const responseData = data;
        this.quotesObj = responseData["data"] as Quotes;
        this.quotesObjFG.patchValue(this.quotesObj);
        // this.getGalleryImageById(this.id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(error);
      }
    );
  }

  saveFormEventSubmit() {
    this.authService.markFormGroupTouched(this.quotesObjFG);
    // console.log(this.quotesObjFG);
    if (this.quotesObjFG.valid) {
      this.quotesObj = this.quotesObjFG.value;
      this.quotesObj.idquotes = this.id;
      //  console.log("id......" + this.id);

      if (this.id > 0) {
        this.quotesService.update(this.quotesObj).subscribe(
          data => {
            //  console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            // console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.authService.showSuccessMsgFn(
                "Your Quotes Updated SuccessFully"
              );
              this.quotesObj = responseData["data"] as Quotes;
              this.router.navigate(["/quotes_list"]);
            } else {
              this.authService.showWarningMsgFn(
                this.AppMessages.res_msg_status_error
              );
            }
            this.spinnerService.hide();
          },
          err => {
            this.spinnerService.hide();
            this.authService.showErrorMsgCommonFn(err);
          }
        );
      } else {
        this.quotesService.save(this.quotesObj).subscribe(
          data => {
            // console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            //  console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              // Show Success Msg
              // this.authService.showSuccessMsgFn(
              //   this.AppMessages.res_msg_status_success
              // );
              this.quotesObj = responseData["data"] as Quotes;
            } else {
              this.authService.showWarningMsgFn(
                this.AppMessages.res_msg_status_error
              );
            }
            this.spinnerService.hide();
            this.activeFormNo = 2;
          },
          err => {
            this.spinnerService.hide();
            this.authService.showErrorMsgCommonFn(err);
          }
        );
      }
    }
  }
  updateImage() {
    if (this.imageSetForUpdateChanged === true) {
      if (
        this.fileSize > 0 &&
        this.imageSetForUpdateChanged === true &&
        this.fileSize <= 3
      ) {
        this.statusOpenImageDialog = false;
        this.imageChangedEvent = "";
        (<HTMLInputElement>document.getElementById("selectImage")).value = "";
        // this.studentObj.profile_image = this.imageToSave;
        this.imageUploadAndUpdate();
      } else {
        console.log("image file size greater than 3 mb ");
      }
    } else {
      console.log("Error in updating image ");
    }
  }
  previousImg;
  showImageDialog() {
    this.statusOpenImageDialog = true;
    this.imageChangedEvent = "";
    // this.imageToSave = "";
    this.imageSetForUpdateChanged = false;
    this.previousImg = this.imageToSave;
    // this.previousImg = this.studentObj.profile_image;
  }

  hideImageDialog() {
    this.statusOpenImageDialog = false;
    this.imageChangedEvent = "event";
    this.imageToSave = "";
    this.imageToSave = this.previousImg;
    this.imageSetForUpdateChanged = false;
    (<HTMLInputElement>document.getElementById("selectImage")).value = "";
  }

  imageCropped(image: string) {
    //  console.log(image);
    var base64str = image.substr(22);
    var decoded = atob(base64str);
    var fileSizeMb;
    var fileSizeKb;
    fileSizeMb = decoded.length / 1000000;
    fileSizeKb = decoded.length / 1000;
    this.fileSize = fileSizeMb;
    this.imageToSave = image;
    this.imageSetForUpdateChanged = true;
    if (this.statusFormUpdating === true) {
      document
        .getElementById("studentImage")
        .setAttribute("src", this.imageToSave);
    }
  }

  fileChangeEvent(event: any): void {
    var filetype = event.srcElement.files[0].type;
    let imageType = filetype.split("/")[1];
    if (this.imageFormatArray.indexOf(imageType) > -1) {
      this.fileValidStatus = false;
      this.imageChangedEvent = event;
    } else {
      this.fileValidStatus = true;
      this.imageToSave = "";
      this.imageChangedEvent = "";
    }
  }

  imageUploadAndUpdate() {
    this.authService.markFormGroupTouched(this.quotesObjFG);
    this.spinnerService.show();
    this.quotesObj.quotes_image = this.imageToSave;
    this.quotesService.imageUpload(this.quotesObj).subscribe(
      data => {
        const responseData = data as any;
        if (
          responseData["status_code"] ===
          AppConstants.RESPONSE_STATUS_CODE_SUCCESS
        ) {
          this.quotesObj = responseData["data"];

          // this.statusImageUpload = true;
          this.imageToSave = "";
          this.imageSetForUpdateChanged = false;
          //  this.getGalleryImageById(this.id);
          this.spinnerService.hide();

          if (this.id == 0) {
            this.router.navigate(["/quotes_list"]);
            this.authService.showSuccessMsgFn("Quotes Submitted SuccessFully");
          }
        } else {
          this.authService.showWarningMsgFn(
            this.AppMessages.res_msg_status_error
          );
        }
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  getGalleryImageById(id) {
    this.spinnerService.show();

    this.quotesService.getGalleryImageById(id).subscribe(
      data => {
        const responseData = data as any;
        this.imageToSave = "data:image/png;base64," + responseData["data"];
        this.spinnerService.hide();
      },
      err => {
        // Spinner Hide
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  submitButton() {
    this.router.navigate(["/quotes_list"]);
    //this.router.navigate(["/gallery_list"]);
    // this.authService.showSuccessMsgFn(
    //   "Your Application Submitted SuccessFully"
    // );
  }
  onCancel() {
    this.router.navigate(["/quotes_list"]);
  }
}
