import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Event } from "src/app/_models/event.model";
import { EventService } from "src/app/_services/event.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as moment from "moment";
import { DateFormatService } from "src/app/_services/date-format.service";

@Component({
  selector: "app-event-saveor-update",
  templateUrl: "./event-saveor-update.component.html",
  styleUrls: ["./event-saveor-update.component.css"]
})
export class EventSaveorUpdateComponent implements OnInit {
  public Editor = ClassicEditor;
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;

  //id: number = 0;
  eventObjFG: FormGroup;
  userObj2FG: FormGroup;
  id: number;
  //minDate = new Date(1990, 0, 1);

  minDate: Date = new Date();
  activeFormNo = 1;

  eventObj: Event = new Event();
  //image
  studentObjectImage: Event = new Event();
  idevent = 0;

  imageToSave = "";

  imageChangedEvent: any = "";
  statusOpenImageDialog = false;
  imageNumber = 0;
  imageSetForUpdateChanged = false;
  statusFormUpdating: boolean = false;

  statusImageUpload: boolean = false;
  fileSize;
  imageFormatArray: string[] = Object.values(AppConstants.imageFileFormats);
  fileValidStatus: boolean = false;
  prevoiusAdvertuserUrl: string;

  public imageUrls: any[];

  //date
  SpeciedInputField: boolean = true;

  updateButton: boolean = false;
  ImageOne: boolean = false;

  activeFormNotwo;

  ckEdiorConfig = {
    extraPlugins: 'filebrowser',
    // mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
    mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
    mathJaxClass: 'equation',
    filebrowserBrowseUrl: 'EditFM/index.html?type=image',
    filebrowserUploadUrl: 'filemanager/upload/defaults',
    filebrowserImageBrowseUrl: 'EditFM/index.html?type=image',
    toolbarGroups: [
      { 'name': 'clipboard', 'groups': ['clipboard', 'undo'] },
      { 'name': 'editing', 'groups': ['find', 'selection', 'spellchecker'] },
      { 'name': 'paragraph', 'groups': ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { 'name': 'document', 'groups': ['mode'] },
      { 'name': 'insert', 'groups': ['insert'] },
      { 'name': 'basicstyles', 'groups': ['basicstyles', 'cleanup'] },
      { 'name': 'styles', 'groups': ['styles'] },
      { 'name': 'colors' },
    ]
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private dateFormatService: DateFormatService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idevent === 0) {
        this.id = params.idevent;
        this.eventObj.idevent = this.id;
        // this.eventObj.idevent = this.id;
      } else if (params.idevent > 0) {
        this.id = params.idevent;
        this.eventObj.idevent = this.id;
        //this.eventObj.idevent = this.id;
        this.getEventByid(this.id);
      }
    });
  }

  ngOnInit() {
    this.formObj1FormValidate();
  }

  formObj1FormValidate() {
    this.eventObjFG = this.formBuilder.group({
      event_name: new FormControl(this.eventObj.event_name, [
        Validators.compose([
          Validators.required,

          Validators.maxLength(50),
          Validators.pattern(AppConstants.aplhaNumberic)
        ])
      ]),

      location: new FormControl(this.eventObj.location, [
        Validators.compose([
          Validators.required,

          Validators.maxLength(50),
          Validators.pattern(AppConstants.aplhaNumberic)
        ])
      ]),

      description: new FormControl(this.eventObj.description, [
        Validators.compose([Validators.required])
      ]),
      short_description: new FormControl(this.eventObj.short_description, [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),

      // category: new FormControl(this.eventObj.category, [
      //   Validators.compose([
      //     Validators.required,
      //     Validators.maxLength(50),
      //     Validators.pattern(AppConstants.aplhaNumberic)
      //   ])
      // ]),

      start_date: new FormControl(this.eventObj.start_date, [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      end_date: new FormControl(this.eventObj.end_date, [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      published_start_date: new FormControl(
        this.eventObj.published_start_date,
        [Validators.compose([Validators.required, Validators.maxLength(50)])]
      ),
      published_end_date: new FormControl(this.eventObj.published_end_date, [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ])
    });
  }

  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }


  saveFormEventSubmit() {
    this.authService.markFormGroupTouched(this.eventObjFG);
    ///  console.log(this.eventObjFG);
    if (this.eventObjFG.valid) {
      this.eventObj = this.eventObjFG.value;
      let publishStart = moment(this.eventObjFG.controls.published_start_date.value).format("YYYY-MM-DD");
      let publishend = moment(this.eventObjFG.controls.published_end_date.value).format("YYYY-MM-DD");
      let startDate = moment(this.eventObjFG.controls.start_date.value).format("YYYY-MM-DD");
      let endDate = moment(this.eventObjFG.controls.end_date.value).format("YYYY-MM-DD");
      this.eventObj.published_start_date = this.dateFormatService.parseDate(publishStart);
      this.eventObj.published_end_date = this.dateFormatService.parseDate(publishend);
      this.eventObj.start_date = this.dateFormatService.parseDate(startDate);
      this.eventObj.end_date = this.dateFormatService.parseDate(endDate);
      // console.log(this.eventObj.published_start_date);
      // console.log(this.eventObj.published_end_date);
      this.eventObj.idevent = this.id;
      //  console.log("id......" + this.eventObj.idevent);
      if (this.id > 0) {
        this.eventService.update(this.eventObj).subscribe(
          data => {
            const responseData = data;
            this.eventObj = responseData["data"] as Event;
            this.eventObjFG.reset();
            this.spinnerService.hide();
            this.router.navigate(["/eventList"]);
          },
          err => {
            this.authService.showWarningMsgFn(
              this.AppMessages.res_msg_status_error
            );
          }
        );
      } else {
        this.eventService.save(this.eventObj).subscribe(
          data => {
            //console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            // console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.eventObj = responseData["data"] as Event;
              //console.log(this.eventObj);
              this.id = this.eventObj.idevent;
              //console.log(this.id);
              this.activeFormNo = 2;
              this.statusImageUpload = true;
              this.imageToSave = "";
              this.imageSetForUpdateChanged = false;
              // this.authService.showSuccessMsgCommonFn(responseData);
              // this.eventObjFG.reset();
            } else {
              this.authService.showWarningMsgFn(
                this.AppMessages.res_msg_status_error
              );
            }
            this.spinnerService.hide();
          },
          err => {
            // Spinner Hide
            this.spinnerService.hide();
            this.authService.showErrorMsgCommonFn(err);
          }
        );
      }
    }
  }

  getEventByid(id) {
    this.eventService.getById(id).subscribe(
      data => {
        this.statusImageUpload = true;
        this.updateButton = true;
        const responseData = data;
        this.eventObj = responseData["data"] as Event;
        this.eventObjFG.patchValue(this.eventObj);
      },
      err => {
        console.log(err);
        // Spinner Hide
        this.spinnerService.hide();

        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  onCancelStudentForm(studentObjFG: FormGroup) {
    // this.eventObj = new Event();
    this.onCancel(studentObjFG);
  }

  onCancel(formGroupToCancel: FormGroup) {
    this.eventObjFG.reset();
    this.goBack();
  }

  goBack() {
    this.router.navigate(["/eventList"]);
    // let url: string = "/studentOverview/" + this.studentid;
    // this.router.navigateByUrl(url);
  }

  previousImg;

  showImageDialog(imgNumber) {
    this.imageNumber = imgNumber;
    this.statusOpenImageDialog = true;
    this.imageChangedEvent = "";
    // this.imageToSave = "";
    this.imageSetForUpdateChanged = false;
    // this.previousImg = this.imageToSave;
    // this.previousImg = this.studentObj.profile_image;
  }

  hideImageDialog() {
    this.statusOpenImageDialog = false;
    this.imageChangedEvent = "event";
    this.imageToSave = "";
    // this.imageToSave = this.previousImg;
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
    // if (this.statusFormUpdating === true) {
    //   document
    //     .getElementById("studentImage")
    //     .setAttribute("src", this.imageToSave);
    // }
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
        //console.log(this.imageNumber + "000");
        // if (this.imageNumber == 1) {
        //   this.imageUploadAndUpdateForEvent();
        // } else {
        //   this.imageUploadAndUpdateForEventTwo();
        // }
        switch (this.imageNumber) {
          case 1:
            this.imageUploadAndUpdateForEvent();
            break;
          case 2:
            this.imageUploadAndUpdateForEventTwo();
            break;
          case 3:
            this.imageUploadAndUpdateForEventThree();
            break;
          case 4:
            this.imageUploadAndUpdateForEventfour();
            break;
          case 5:
            this.imageUploadAndUpdateForEventfive();
        }
        // this.authService.showSuccessMsgFn(
        //   "Your Application Submitted SuccessFully"
        // );
      } else {
        console.log("image file size greater than 3 mb ");
      }
    } else {
      console.log("Error in updating image ");
    }
  }
  imageUploadAndUpdateForEvent() {
    this.spinnerService.show();
    this.eventObj.event_image = this.imageToSave;
    //console.log(this.eventObj);
    this.eventService.imageUploadForEvent(this.eventObj).subscribe(
      data => {
        const responseData = data as any;
        this.spinnerService.hide();
        this.activeFormNo = 3;
        // console.log(responseData);
        //  this.ImageOne = true;
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }
  imageUploadAndUpdateForEventTwo() {
    //console.log("#######&&&&&&&&********");
    this.spinnerService.show();
    this.eventObj.event_image_two = this.imageToSave;
    // console.log(this.eventObj);
    this.eventService.imageUploadForEventTwo(this.eventObj).subscribe(
      data => {
        const responseData = data as any;
        // console.log(responseData);
        this.spinnerService.hide();
        this.activeFormNo = 4;
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }
  imageUploadAndUpdateForEventThree() {
    //console.log("#######&&&&&&&&********");
    this.spinnerService.show();
    this.eventObj.event_image_three = this.imageToSave;
    this.eventService.imageUploadForEventThree(this.eventObj).subscribe(
      data => {
        const responseData = data as any;
        console.log(responseData);
        this.spinnerService.hide();
        this.activeFormNo = 5;
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }
  imageUploadAndUpdateForEventfour() {
    //console.log("#######&&&&&&&&********");
    this.spinnerService.show();
    this.eventObj.event_image_four = this.imageToSave;
    this.eventService.imageUploadForEventFour(this.eventObj).subscribe(
      data => {
        const responseData = data as any;
        // console.log(responseData);
        this.spinnerService.hide();
        this.activeFormNo = 6;
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }
  imageUploadAndUpdateForEventfive() {
    //console.log("#######&&&&&&&&********");
    this.spinnerService.show();
    this.eventObj.event_image_five = this.imageToSave;
    this.eventService.imageUploadForEventFive(this.eventObj).subscribe(
      data => {
        const responseData = data as any;
        // console.log(responseData);
        this.spinnerService.hide();
        this.activeFormNo = 6;
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  submitButton() {
    this.router.navigate(["/eventList"]);
    // this.authService.showSuccessMsgFn(
    //   "Your Application Submitted SuccessFully"
    // );
  }
}
