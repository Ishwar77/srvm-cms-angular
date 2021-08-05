import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { AppConstants } from "src/app/_helpers/app-constants";

import * as moment from "moment";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { StudentService } from "src/app/_services/student.service";
import { Student } from "src/app/_models/student.model";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";

import { AlumniService } from "src/app/_services/alumni.service";
import { COUNTRIESCODE } from "./countriescode";
@Component({
  selector: "app-student-save-or-update",
  templateUrl: "./student-save-or-update.component.html",
  styleUrls: ["./student-save-or-update.component.css"]
})
export class StudentSaveOrUpdateComponent implements OnInit {
  AppConstants: any = AppConstants;
  AppMessages: any;
  activeFormNo = 1; // Active Form No.
  studentObjFG: FormGroup;
  userObj2FG: FormGroup;
  id: number;
  // minDate = new Date(1990, 0, 1);
  // maxDate = new Date(2019, 4, 22);
  studentObj: Student = new Student();
  studentObjectImage: Student = new Student();

  studentid = 0;

  imageToSave = "";
  imageChangedEvent: any = "";
  statusOpenImageDialog = false;
  imageSetForUpdateChanged = false;
  statusFormUpdating: boolean = false;

  statusImageUpload: boolean = false;
  fileSize;
  imageFormatArray: string[] = Object.values(AppConstants.imageFileFormats);
  fileValidStatus: boolean = false;
  prevoiusAdvertuserUrl: string;

  //date
  SpeciedInputField: boolean = true;

  updateButton: boolean = false;

  // selectedYearForQuarter;
  yearStringArrayTo = [];
  yearStringArrayfrom = [];

  countriescode: any = [];
  serverDate;

  alumniId = 0;
  studentCount: Student;

  IdSelectedValue: boolean = false;
  IdString;
  countBatchFrom;
  AluminBatchFrom;

  alimniFormId;

  statusAddress = false;
  addressTypestatus: boolean = false;
  @ViewChild("myCheck") myCheck: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private studentService: StudentService,
    private alumniService: AlumniService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      //   this.studentid = +params["idstudent"];
      //   if (this.studentid) {
      //     console.log(this.studentid);
      //     this.studentObj.idstudent = this.studentid;
      //     console.log(
      //       "------------------------------" + this.studentObj.idstudent
      //     );
      //     this.getStudentByid(this.studentObj.idstudent);
      //   }
      this.id = params.idstudent;

      if (this.id > 0) {
        this.studentid = params.idstudent;
        this.studentObj.idstudent = params.idstudent;
        this.getStudentByid(this.studentObj.idstudent);
      }

      // if (params.idstudent === 0) {
      //   this.id = params.idstudent;
      //   this.studentid = params.idstudent;
      //   this.studentObj.idstudent = this.studentid;
      // } else if (params.idstudent > 0) {
      //   this.id = params.idstudent;
      //   this.studentid = params.idstudent;
      //   this.studentObj.idstudent = this.studentid;

      //   this.getStudentByid(this.studentObj.idstudent);
      // }
    });

    this.countriescode = COUNTRIESCODE;
  }

  ngOnInit(): void {
    this.formObj1FormValidate();
    this.generateYearsForDropDownFrom();
  }

  submitButton() {
    this.router.navigateByUrl("/alumniList");
    // this.router.navigate(["/studentList"]);
    this.authService.showSuccessMsgFn(
      "Your Application Submitted SuccessFully"
    );
  }
  formObj1FormValidate() {
    this.studentObjFG = this.formBuilder.group({
      //   unique_id: new FormControl(this.studentObj.unique_id, [
      //     Validators.compose([
      //       Validators.required,
      //       Validators.maxLength(50)
      //       // Validators.pattern(AppConstants.aplhaNumberic)
      //     ])
      //   ]),
      first_name: new FormControl(this.studentObj.first_name, [
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(AppConstants.aplhaNumberic)
        ])
      ]),
      last_name: new FormControl(this.studentObj.last_name, [
        Validators.compose([
          //  Validators.required,
          Validators.maxLength(50),
          Validators.pattern(AppConstants.aplhaNumberic)
        ])
      ]),
      batch_from: new FormControl("", [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      batch_to: new FormControl("", [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      dob: new FormControl(this.studentObj.dob, [
        // Validators.compose([Validators.required,])
      ]),
      blood_group: new FormControl(this.studentObj.blood_group, [
        //  Validators.compose([Validators.required,])
      ]),
      mobile_number_one: new FormControl(this.studentObj.mobile_number_one, [
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),

          Validators.minLength(10)
        ])
      ]),
      mobile_number_one_code: new FormControl(
        this.studentObj.mobile_number_one_code,
        [Validators.compose([Validators.required])]
      ),
      mobile_number_two: new FormControl(this.studentObj.mobile_number_two, [
        Validators.compose([
          Validators.maxLength(50),
          Validators.minLength(10),
          Validators.pattern(AppConstants.CELL_NUMBER_PATTERN)
        ])
      ]),
      mobile_number_two_code: new FormControl(
        this.studentObj.mobile_number_two_code
      ),
      residential_address_one: new FormControl(
        this.studentObj.residential_address_one,
        [Validators.compose([Validators.required, Validators.maxLength(50)])]
      ),
      residential_address_two: new FormControl(
        this.studentObj.residential_address_two,
        [Validators.compose([Validators.maxLength(50)])]
      ),
      residential_city: new FormControl(this.studentObj.residential_city, [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      residential_country: new FormControl(
        this.studentObj.residential_country,
        [Validators.compose([Validators.required, Validators.maxLength(50)])]
      ),
      residential_pincode: new FormControl(
        this.studentObj.residential_pincode,
        [Validators.compose([Validators.required])]
      ),

      permanent_address_one: new FormControl(
        this.studentObj.permanent_address_one,
        [Validators.compose([Validators.required, Validators.maxLength(50)])]
      ),
      permanent_address_two: new FormControl(
        this.studentObj.permanent_address_two,
        [Validators.compose([Validators.maxLength(50)])]
      ),
      permanent_city: new FormControl(this.studentObj.permanent_city, [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      permanent_country: new FormControl(this.studentObj.permanent_country, [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      permanent_pincode: new FormControl(this.studentObj.permanent_country, [
        Validators.compose([Validators.required])
      ]),

      designation: new FormControl(this.studentObj.designation, [
        Validators.compose([Validators.required, Validators.maxLength(45)])
      ]),
      other: new FormControl(this.studentObj.other, [
        Validators.compose([Validators.maxLength(45)])
      ]),
      occupation: new FormControl(this.studentObj.occupation, [
        Validators.compose([
          /// Validators.required,
          Validators.maxLength(45)
          //   Validators.minLength(2),
          //   Validators.maxLength(100)
        ])
      ]),
      company: new FormControl(this.studentObj.company, [
        Validators.compose([
          // Validators.required,
          Validators.maxLength(50)
        ])
      ]),
      email_id_one: new FormControl(this.studentObj.email_id_one, [
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(AppConstants.emailPattern)
        ])
      ]),
      email_id_two: new FormControl(this.studentObj.email_id_two, [
        Validators.maxLength(50),
        Validators.pattern(AppConstants.emailPattern)
      ])
    });
  }

  checkClicked() {
    // this.statusAddress = event.checked;
    // console.log(event);
    if (this.myCheck.nativeElement.checked == true) {
      let residentialaddressesone = this.studentObjFG.controls
        .residential_address_one.value;
      let residentialaddressestwo = this.studentObjFG.controls
        .residential_address_two.value;
      let residentialcity = this.studentObjFG.controls.residential_city.value;
      let residentialcountry = this.studentObjFG.controls.residential_country
        .value;
      let residential_pincode = this.studentObjFG.controls.residential_pincode
        .value;
      // console.log("_________________");
      // console.log(residentialcountry);
      // console.log("_________________");
      this.studentObjFG.controls.permanent_address_one.setValue(
        residentialaddressesone
      );
      this.studentObjFG.controls.permanent_address_two.setValue(
        residentialaddressestwo
      );
      this.studentObjFG.controls.permanent_city.setValue(residentialcity);
      this.studentObjFG.controls.permanent_country.setValue(residentialcountry);
      this.studentObjFG.controls.permanent_pincode.setValue(
        residential_pincode
      );
    } else {
      this.studentObjFG.controls.permanent_address_one.setValue("");
      this.studentObjFG.controls.permanent_address_two.setValue("");
      this.studentObjFG.controls.permanent_city.setValue("");
      this.studentObjFG.controls.permanent_country.setValue("");
      this.studentObjFG.controls.permanent_pincode.setValue("");
    }
  }
  clickeOther() {
    let designation = this.studentObjFG.controls.designation.value;

    if (designation == "Others") {
      this.SpeciedInputField = false;
    } else {
      this.SpeciedInputField = true;
    }
  }

  saveFormStudentSubmit() {
    // console.log(this.studentObjFG);
    // console.log(this.studentObjFG);
    this.authService.markFormGroupTouched(this.studentObjFG);
    if (this.studentObjFG.valid) {
      this.studentObj = this.studentObjFG.value;
      this.studentObj.idstudent = this.studentid;
      this.studentObj.unique_id = document.getElementById(
        "idspan"
      ).innerHTML = "SRVM-" + this.alimniFormId;

      //   if (this.statusImageUpload == true && this.studentid > 0) {
      //     this.studentObj.profile_image = this.imageToSave;
      //   } else {
      //     this.studentObj.profile_image = " ";
      //   }

      if (this.id > 0) {
        this.studentService.update(this.studentObj).subscribe(
          data => {
            // console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            // console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.studentObj = responseData["data"] as Student;
              this.id = this.studentObj.idstudent;

              // this.activeFormNo = 2;
              // this.getStudentByid(this.studentid);
              // this.goBack();
              this.router.navigate(["/alumniList"]);
              // Show Success Msg
              this.authService.showSuccessMsgFn(
                "Your Application Updated SuccessFully"
              );
            } else {
              // Show Warning Msg Notification
              this.authService.showWarningMsgFn(
                this.AppMessages.res_msg_status_error
              );
              // this.authService.showWarningMsgForLangPreferenceFn(responseData);
            }
            // Spinner Hide
            this.spinnerService.hide();

            // this.router.navigate(['/user/login']);
          },
          err => {
            // Spinner Hide
            this.spinnerService.hide();
            this.authService.showErrorMsgCommonFn(err);
          }
        );
      } else {
        this.studentService.save(this.studentObj).subscribe(
          data => {
            //  console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            // console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              // Show Success Msg
              // this.authService.showSuccessMsgFn(
              //   this.AppMessages.res_msg_status_success
              // );
              this.studentObj = responseData["data"] as Student;
              this.id = this.studentObj.idstudent;

              this.activeFormNo = 2;
              // this.getStudentByid(this.studentid);
              // this.goBack();
              // this.router.navigate(["/studentList"]);
            } else {
              // Show Warning Msg Notification
              this.authService.showWarningMsgFn(
                this.AppMessages.res_msg_status_error
              );
              // this.authService.showWarningMsgForLangPreferenceFn(responseData);
            }
            // Spinner Hide
            this.spinnerService.hide();

            // this.router.navigate(['/user/login']);
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

  getStudentByid(id) {
    this.studentService.getById(id).subscribe(
      data => {
        this.statusImageUpload = true;
        this.updateButton = true;
        const responseData = data;

        this.studentObj = responseData["data"] as Student;
        this.studentObjFG.patchValue(this.studentObj);
        let designation = this.studentObjFG.controls.designation.value;
        if (designation == "Others") {
          this.SpeciedInputField = false;
        } else {
          this.SpeciedInputField = true;
        }
        this.getStudentImageById(id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        // console.log(error);
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(error);
      }
    );
  }

  onCancelStudentForm(studentObjFG: FormGroup) {
    this.studentObj = new Student();
    this.onCancel(studentObjFG);
  }

  onCancel(formGroupToCancel: FormGroup) {
    this.studentObjFG.reset();
    this.goBack();
  }

  goBack() {
    if (this.studentid == 0) {
      this.router.navigate(["/alumniList"]);
    } else {
      let url: string = "/alumniList";
      this.router.navigateByUrl(url);
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
        this.authService.showWarningMsgFn("image file size greater than 3 mb");
      }
    } else {
      this.authService.showWarningMsgFn("Error in updating image ");
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
    this.authService.markFormGroupTouched(this.studentObjFG);
    this.spinnerService.show();
    // if (this.statusImageUpload == true) {
    //   this.studentObj.profile_image = this.imageToSave;
    //   // Spinner Show
    // } else {
    //   this.studentObj.profile_image = "";
    // }

    this.studentObj.profile_image = this.imageToSave;
    //  console.log(this.studentObj.profile_image);
    this.studentService.imageUpload(this.studentObj).subscribe(
      data => {
        const responseData = data as any;
        //  console.log(responseData);
        if (
          responseData["status_code"] ===
          AppConstants.RESPONSE_STATUS_CODE_SUCCESS
        ) {
          this.studentObj = responseData["data"];

          // this.statusImageUpload = true;
          this.imageToSave = "";
          this.imageSetForUpdateChanged = false;
          this.getStudentImageById(this.id);
          this.spinnerService.hide();
          // Show Success Msg
          this.authService.showSuccessMsgFn(
            "Your Application Submitted SuccessFully"
          );
          this.router.navigateByUrl("/alumniList");
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

  getStudentImageById(id) {
    this.spinnerService.show();

    this.studentService.getStudentImageById(id).subscribe(
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

  //   getCountry(selectedCountryObject: any) {
  //     console.log(selectedCountryObject);
  //   }

  //   getNumber(enteredNumberObject: any) {
  //     console.log(enteredNumberObject.mobile);
  //   }
  openSaveUpdateDialog() {
    this.router.navigateByUrl("/alumniSave/new");
  }

  generateYearsForDropDownFrom() {
    // if (this.serverDate) {
    let yearArray = [];
    const totalYearsCount = 2019; //AppConstants.YEAR_DROPDOWN_ITERATION_COUNT;

    let year = moment(this.serverDate);

    for (let i = 1955; i < totalYearsCount; i++) {
      yearArray.push(year.format("YYYY"));
      year.subtract(1, "years");
    }
    this.yearStringArrayfrom = yearArray;
    //console.log("batch from>>>>>>>>>>>>");
    //console.log(this.yearStringArrayfrom);
  }

  generateYearsForDropDownTo() {
    // if (this.serverDate) {
    let yearArray = [];
    const totalYearsCount = 2019; //AppConstants.YEAR_DROPDOWN_ITERATION_COUNT;

    let year = moment(this.serverDate);
    let datafrom = this.studentObjFG.controls.batch_from.value;

    for (let i = datafrom; i <= totalYearsCount; i++) {
      yearArray.push(year.format("YYYY") + "");
      year.subtract(1, "years");
    }
    this.yearStringArrayTo = yearArray;
    this.studentObjFG.controls.batch_to.setValue("");
  }

  getLastStudentSubmitted() {
    this.studentObj = this.studentObjFG.value;
    this.studentObj.batch_from = this.studentObjFG.controls.batch_from.value;
    this.alumniService.getStudentLastSubmitted(this.studentObj).subscribe(
      data => {
        const responseData = data;

        this.studentCount = responseData["count"];

        if (this.studentCount != null) {
          this.countBatchFrom = this.studentCount;
        } else {
          this.countBatchFrom = 0;
        }
        let batchFrom = this.studentObjFG.controls.batch_from.value;
        let batchto = this.studentObjFG.controls.batch_to.value;
        this.IdSelectedValue = true;
        let id = this.countBatchFrom + 1;
        this.alimniFormId = batchFrom + "-" + batchto.substring(2) + "-" + id;
        //this.studentObjFG.controls.unique_id.setValue(alimniFormId);
        document.getElementById("idspan").innerHTML =
          "SRVM-" + this.alimniFormId;
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }
}
