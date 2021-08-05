import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { AppMessagesEn, StudentList } from "src/app/_helpers/app-messages-en";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { StudentExcelUploadService } from "src/app/_services/student-excel-upload.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { Student } from "src/app/_models/student.model";
import { StudentService } from "src/app/_services/student.service";
import { student_status } from "src/app/_models/models-enum";
import { DateFormatService } from "src/app/_services/date-format.service";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { DialogAlumniDetailsComponent } from "../dialog-alumni-details/dialog-alumni-details.component";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from "@angular/animations";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session
  writeAccessFlag: boolean = false;
  studentList: Student[] = [];

  StudentTotalDataCount;
  StudentLimit = 0;
  studentCurrentPageno = 1;
  SpeciedInputField: boolean = true;
  // UI Tabs
  tabNumberArray = [0, 1, 2];
  tabNumber;
  batchObjFG: FormGroup;
  batchObj: Student = new Student();

  yearStringArrayTo = [];
  yearStringArray = [];
  serverDate;
  openDialog = false;
  yearStringArrayfrom = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private studentService: StudentService,
    private dateFormatService: DateFormatService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private studentExcelUploadService: StudentExcelUploadService
  ) {
    this.AppMessages = AppMessagesEn;
    this.PageMessages = StudentList;
    this.tabSwitchFn(this.tabNumberArray[0]);
  }

  ngOnInit() {
    this.formObj1FormValidate();
    // this.formObj2FormValidate();
    this.generateYearsForDropDownFrom();
    this.tabSwitchFn(this.tabNumberArray[0]);
  }

  formObj1FormValidate() {
    this.batchObjFG = this.formBuilder.group({
      batch_from: new FormControl("", [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      batch_to: new FormControl("", [
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      search_text: new FormControl("", [
        Validators.compose([Validators.required])
      ]),
      designation: new FormControl("", [
        Validators.compose([Validators.required])
      ])
    });
  }

  tabSwitchFn(tabNumber) {
    if (tabNumber === this.tabNumberArray[0]) {
      this.tabNumber = tabNumber;

      this.getstudentListByPending(1);
    } else if (tabNumber === this.tabNumberArray[1]) {
      this.tabNumber = tabNumber;
      this.getstudentListByApproved(1);
    } else if (tabNumber === this.tabNumberArray[2]) {
      this.tabNumber = tabNumber;
      this.getstudentListByRejected(1);
    }
  }

  onClickFormReset() {
    this.batchObjFG.reset({
      batch_from: "",
      batch_to: "",
      search_text: "",
      designation: ""
    });
    this.tabSwitchFn(this.tabNumber);
  }

  getstudentListByPending(pageno: number) {
    this.getpendingList(pageno);
  }

  getstudentListByApproved(pageno: number) {
    this.getApprovedList(pageno);
  }
  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }
  getstudentListByRejected(pageno: number) {
    this.getRejectedList(pageno);
  }

  openDialogGallery(rowObj) {
    //  console.log(rowObj);
    const dialogRef = this.dialog.open(DialogAlumniDetailsComponent, {
      width: "850px",
      height: "100%",
      hasBackdrop: true,
      data: rowObj
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.getstudentListByApproved(1);
    });
  }

  getpendingList(pageno: number) {
    this.studentService.pendingList(pageno, this.StudentLimit).subscribe(
      data => {
        const responseData = data;

        // console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.studentList = listData["result"] as Student[];
            //console.log(this.studentList);
            this.StudentTotalDataCount = listData["count"];
            this.StudentLimit = listData["limit"];
            this.studentCurrentPageno = +listData["pageno"];
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

  getApprovedList(pageno: number) {
    this.studentService.approvedList(pageno, this.StudentLimit).subscribe(
      data => {
        const responseData = data;
        // console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.studentList = listData["result"] as Student[];
            //  console.log(this.studentList);
            this.StudentTotalDataCount = listData["count"];
            this.StudentLimit = listData["limit"];
            this.studentCurrentPageno = +listData["pageno"];
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

  getRejectedList(pageno: number) {
    this.studentService.rejectedList(pageno, this.StudentLimit).subscribe(
      data => {
        const responseData = data;
        // console.log("responseData" + JSON.stringify(responseData));
        let msgCode = responseData["status_code"];
        if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          let listData = responseData["data"];
          if (listData) {
            this.studentList = listData["result"] as Student[];
            //  console.log(this.studentList);
            this.StudentTotalDataCount = listData["count"];
            this.StudentLimit = listData["limit"];
            this.studentCurrentPageno = +listData["pageno"];
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
    this.router.navigateByUrl("/alumniSave/new");
  }

  deleteStudent(modelObject: Student) {
    this.studentService.delete(modelObject.idstudent).subscribe(
      data => {
        const responseData = data;
        // console.log("data=====" + responseData);
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as Student;
          // this.getStudentList();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  ViewStudentDetail(idstudent: any) {
    let url: string = "/alumniOverview/" + idstudent;
    this.router.navigateByUrl(url);
  }

  approvedConfirmFn(idstudent: number) {
    let confirmTitle = "Approve";
    let confirmBody = "Are you sure?";
    this.snotifyService.confirm(confirmBody, confirmTitle, {
      position: SnotifyPosition.centerCenter,

      closeOnClick: false,
      pauseOnHover: true,
      backdrop: 0.5,
      buttons: [
        {
          text: this.AppMessages.yes_label,
          action: toast => {
            this.tabSwitchFn(this.tabNumber);
            // this.tabSwitchFn(this.tabNumberArray[0]);
            //console.log("+++++++++++++++++" + this.tabNumber);
            this.ApprovedRejectedFn(idstudent, student_status.Approved);
            this.snotifyService.remove(toast.id);

            this.authService.showSuccessMsgFn(
              this.AppMessages.res_msg_status_approved
            );
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

  rejectConfirmFn(idstudent: number) {
    let confirmTitle = "Reject";
    let confirmBody = "Are you sure?";
    this.snotifyService.confirm(confirmBody, confirmTitle, {
      position: SnotifyPosition.centerCenter,
      closeOnClick: false,
      pauseOnHover: true,
      backdrop: 0.5,
      buttons: [
        {
          text: this.AppMessages.yes_label,
          action: toast => {
            // this.tabSwitchFn(this.tabNumberArray[0]);
            this.ApprovedRejectedFn(idstudent, student_status.Rejected);
            this.snotifyService.remove(toast.id);
            this.tabSwitchFn(this.tabNumber);
            this.authService.showSuccessMsgFn(
              this.AppMessages.res_msg_status_rejected
            );
            // console.log("+++++++++++++++++" + this.tabNumber);
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

  ApprovedRejectedFn(idstudent: number, status: student_status) {
    //console.log("rejected");
    this.studentService.approveRejectStatus(idstudent, status).subscribe(
      data => {
        const responseData = data;
        //console.log(responseData);
        if (
          responseData["status_code"] ===
          AppConstants.RESPONSE_STATUS_CODE_SUCCESS
        ) {
          // this.authService.showSuccessMsgFn(
          //   this.AppMessages.saved_successfully_message
          // );
          this.tabSwitchFn(this.tabNumber);
        } else {
          // Error Msg
          this.authService.showWarningMsgCommonFn(responseData);
        }
        // Spinner Hide
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
        if (
          err.error.msgCode === AppConstants.RESPONSE_STATUS_CODE_UNAUTHORIZE
        ) {
          this.authService.logout();
        } else {
          // Show Warning Msg Notification
        }
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  activateConfirmFn(idstudent: number) {
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
            this.DeleteRejectedData(idstudent);
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

  DeleteRejectedData(idstudent: number) {
    // console.log("deleted data");
    this.studentService.deleteRejectData(idstudent).subscribe(
      data => {
        const responseData = data;
        //  console.log("deleted data 1");
        // console.log(responseData);
        if (
          responseData["status_code"] ===
          AppConstants.RESPONSE_STATUS_CODE_SUCCESS
        ) {
          this.authService.showSuccessMsgFn("Deleted SucessFullly");
          this.tabSwitchFn(this.tabNumber);
        } else {
          // Error Msg
          this.authService.showWarningMsgCommonFn("Some Error Occur");
        }
        // Spinner Hide
        this.spinnerService.hide();
      },
      err => {
        this.spinnerService.hide();
        if (
          err.error.msgCode === AppConstants.RESPONSE_STATUS_CODE_UNAUTHORIZE
        ) {
          this.authService.logout();
        } else {
          // Show Warning Msg Notification
        }
        this.authService.showErrorMsgCommonFn(err);
      }
    );
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
  }

  generateYearsForDropDownTo() {
    // if (this.serverDate) {
    let yearArray = [];
    const totalYearsCount = 2019; //AppConstants.YEAR_DROPDOWN_ITERATION_COUNT;

    let year = moment(this.serverDate);
    let datafrom = this.batchObjFG.controls.batch_from.value;

    for (let i = datafrom; i <= totalYearsCount; i++) {
      yearArray.push(year.format("YYYY") + "");
      year.subtract(1, "years");
    }
    this.yearStringArrayTo = yearArray;
    this.batchObjFG.controls.batch_to.setValue("");
    // console.log(this.batchObjFG.controls.batch_to.value);
  }
  //   getAlumniListSearchByBatchSelection() {
  //     this.getAlumniListSearchByBatch(1);
  //   }

  //   getAlumniListSearchByBatch(pageno: number) {
  //     // console.log("batch search by alumni list");
  //     this.batchObj = this.batchObjFG.value;
  //     this.batchObj.batch_from = this.batchObjFG.controls.batch_from.value;
  //     this.batchObj.batch_to = this.batchObjFG.controls.batch_to.value;
  //     // this.tabSwitchFn(this.tabNumber){

  //     //  console.log(this.batchObj.batch_to);
  //     // console.log(this.batchObj.batch_from);
  //     this.studentService
  //       .getAlumniListSearchbyBatchSelection(
  //         this.batchObj,
  //         pageno,
  //         this.StudentLimit
  //       )
  //       .subscribe(
  //         data => {
  //           const responseData = data;
  //           // console.log("responseData" + JSON.stringify(responseData));
  //           let msgCode = responseData["status_code"];
  //           if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
  //             let listData = responseData["data"];
  //             if (listData) {
  //               this.studentList = listData["result"] as Student[];
  //               this.StudentTotalDataCount = listData["count"];
  //               this.StudentLimit = listData["limit"];
  //               this.studentCurrentPageno = +listData["pageno"];
  //             }
  //             this.tabSwitchFn(this.tabNumber);
  //           } else {
  //             // Show Warning Msg Notification
  //             this.authService.showWarningMsgCommonFn(responseData);
  //           }
  //           this.spinnerService.hide();
  //         },
  //         err => {
  //           console.log(err);
  //           // Spinner Hide
  //           this.spinnerService.hide();

  //           this.authService.showErrorMsgCommonFn(err);
  //         }
  //       );
  //   }

  getFormDataValue() {
    this.getFormDataValuebyIdorName(1);
  }

  getFormDataValuebyIdorName(pageno: number) {
    //console.log("batch search by alumni list");
    this.batchObj = this.batchObjFG.value;
    this.batchObj.batch_from = this.batchObjFG.controls.batch_from.value;
    this.batchObj.batch_to = this.batchObjFG.controls.batch_to.value;
    this.batchObj.designation = this.batchObjFG.controls.designation.value;
    //console.log(this.batchObj);
    // console.log(this.batchObjFG.controls.designation.value);
    // this.batchObj.status = this.studentList[0].status;
    //console.log("Searching method...............");
    if (this.tabNumber === this.tabNumberArray[0]) {
      this.batchObj.status = student_status.Pending;
      //console.log(this.batchObj.status);
    } else if (this.tabNumber === this.tabNumberArray[1]) {
      this.batchObj.status = student_status.Approved;
      //  console.log(this.batchObj.status);
    } else if (this.tabNumber === this.tabNumberArray[2]) {
      this.batchObj.status = student_status.Rejected;
      // console.log(this.batchObj.status);
    }

    this.studentService
      .getAlumniListSearchbyIdorName(this.batchObj, pageno, this.StudentLimit)
      .subscribe(
        data => {
          //console.log(this.batchObj);
          const responseData = data;
          // console.log("responseData" + JSON.stringify(responseData));
          let msgCode = responseData["status_code"];
          if (msgCode === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
            let listData = responseData["data"];
            if (listData) {
              this.studentList = listData["result"] as Student[];
              //console.log("___________id search_______________");
              //console.log(this.studentList);
              this.StudentTotalDataCount = listData["count"];
              this.StudentLimit = listData["limit"];
              this.studentCurrentPageno = +listData["pageno"];
            }
          } else {
            // Show Warning Msg Notification
            this.authService.showWarningMsgCommonFn(responseData);
          }
          this.spinnerService.hide();
          // this.tabSwitchFn(this.tabNumber);
        },
        err => {
          console.log(err);
          // Spinner Hide
          this.spinnerService.hide();

          this.authService.showErrorMsgCommonFn(err);
        }
      );
  }

  onClickwriteExcle() {
    this.studentExcelUploadService.excelWriting();
  }

  onClickwriteExcleBySearch() {
    // console.log("data download");
    this.batchObj = this.batchObjFG.value;
    this.batchObj.batch_from = this.batchObjFG.controls.batch_from.value;
    this.batchObj.batch_to = this.batchObjFG.controls.batch_to.value;
    this.batchObj.designation = this.batchObjFG.controls.designation.value;
    // this.batchObj.status = this.studentList[0].status;
    if (this.tabNumber === this.tabNumberArray[0]) {
      this.batchObj.status = student_status.Pending;
      // console.log(this.batchObj.status);
    } else if (this.tabNumber === this.tabNumberArray[1]) {
      this.batchObj.status = student_status.Approved;
      // console.log(this.batchObj.status);
    } else if (this.tabNumber === this.tabNumberArray[2]) {
      this.batchObj.status = student_status.Rejected;
      // console.log(this.batchObj.status);
    }
    this.studentExcelUploadService.excelWritingAsPerSearch(this.batchObj);
  }

  generatePdf() {
    const documentDefinition = this.getDocumentDefinition(this.studentList);
    pdfMake.createPdf(documentDefinition).open();
  }



  // getDocumentDefinition() {
  //   return {
  //     content: [
  //       // ...
  //       {
  //         text: 'Alumni Data',
  //         style: 'header'
  //       },
  //       this.getExperienceObject(this.studentList),


  //     ],
  //     styles: {

  //       header: {
  //         fontSize: 18,
  //         bold: true,
  //         margin: [0, 20, 0, 10],
  //         decoration: 'underline'
  //       },
  //       name: {
  //         fontSize: 16,
  //         bold: true
  //       },
  //       jobTitle: {
  //         fontSize: 14,
  //         bold: true,
  //         italics: true
  //       },
  //       tableHeader: {
  //         bold: true,
  //       },
  //       city: {
  //         fontSize: 10,
  //       }

  //     }
  //   };
  // }

  getDocumentDefinition(studentList) {

    var pdfTableContent = [];

    for (var i = 0; i < studentList.length; i += 2) {
      var pdfTableRow = [];

      pdfTableRow.push(

        [{

          columns: [

            [{
              text: studentList[i].first_name + " " + studentList[i].last_name,
              bold: true,

            },
            {
              text: studentList[i].residential_address_one,

            },
            {
              text: studentList[i].residential_address_two,
            },
            {
              text: studentList[i].residential_city,

              style: 'city'
            },
            {
              text: studentList[i].residential_pincode,
              style: 'city'
            },
            {
              text: studentList[i].residential_country,
              style: 'city'
            },
            ],
          ]
        }]
      );

      if ((i + 1) < studentList.length) {

        pdfTableRow.push(
          [{

            columns: [

              [{
                text: studentList[i + 1].first_name + " " + studentList[i + 1].last_name,
                bold: true,
              },
              {
                text: studentList[i + 1].residential_address_one,
                alignment: 'centre'
              },
              {
                text: studentList[i + 1].residential_address_two,
                alignment: 'centre'
              },
              {
                text: studentList[i + 1].residential_city,
                alignment: 'centre',
                style: 'city'
              },
              {
                text: studentList[i + 1].residential_pincode,
                style: 'city',
                alignment: 'centre'
              },
              {
                text: studentList[i + 1].residential_country,
                style: 'city',
                alignment: 'centre'
              },
              ],
            ]
          }]
        );
      }
      else {
        pdfTableRow.push(
          [{
            columns: []
          }]
        )
      }
      pdfTableContent.push(pdfTableRow);
      //console.log(pdfTableContent)
    }

    var reportTableContent = {
      style: 'tableExample',
      table: {
        widths: ['*', '*'],
        body: pdfTableContent

      },
      layout: {
        hLineWidth: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 1 : 1; // tableBorderWidth : cellborderWidth
        },
        vLineWidth: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 1 : 1;
        },
        hLineColor: function (i, node) {
          return (i === 0 || i === node.table.body.length) ? 'black' : 'gray'; // tableBorderColor : cellborderColor
        },
        vLineColor: function (i, node) {
          return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
        },

      }

    }

    var pdftableSyles = {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    }


    return {
      // header: 'POINTS SALES REPORT (' + fromDate + ' TO ' + toDate + ')',
      content: [

        {
          text: 'Alumni Data',
          alignment: 'center',
          bold: true,
          margin: [0, 10, 0, 10],
        },

        reportTableContent,
      ],
      styles: pdftableSyles,
      // defaultStyle: {
      //   // alignment: 'justify'
      // }
    }



  }

}


