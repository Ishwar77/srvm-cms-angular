import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { Student } from "src/app/_models/student.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService, SnotifyPosition } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { StudentService } from "src/app/_services/student.service";
import { AppMessagesEn, StudentList } from "src/app/_helpers/app-messages-en";
import { DateFormatService } from "src/app/_services/date-format.service";
import { FormGroup } from "@angular/forms";
import { Location } from "@angular/common";
@Component({
  selector: "app-student-details-overview",
  templateUrl: "./student-details-overview.component.html",
  styleUrls: ["./student-details-overview.component.css"]
})
export class StudentDetailsOverviewComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session

  studentList: Student[] = [];
  studentid = 0;
  StudentDetailsList: Student;

  imageToSave = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private studentService: StudentService,
    private dateFormatService: DateFormatService,
    private _location: Location
  ) {
    this.AppMessages = AppMessagesEn;
    this.PageMessages = StudentList;

    this.route.params.subscribe(params => {
      if (params.idstudent === 0) {
        this.studentid = params.idstudent;
        // this.studentObj.idstudent = this.studentid;
      } else if (params.idstudent > 0) {
        this.studentid = params.idstudent;
        // this.studentObj.idstudent = this.studentid;
        this.getStudentByid(this.studentid);
      }
    });
  }

  ngOnInit() { }

  getStudentByid(id) {
    this.studentService.getById(id).subscribe(
      data => {
        const responseData = data;
        this.StudentDetailsList = responseData["data"] as Student;
        this.getStudentImageById(id);
      },
      error => {
        console.log(error);
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

  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
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
            this.deleteStudent(idstudent);
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

  deleteStudent(idstudent) {
    this.studentService.delete(idstudent).subscribe(
      data => {
        const responseData = data;
        // console.log("data=====" + responseData);
        let msg_code = responseData["status_code"];
        if (msg_code === AppConstants.RESPONSE_STATUS_CODE_SUCCESS) {
          const responseData = data as Student;
          //this.getStudentList();
          //this.router.navigate(["/alumniList"]);
          this._location.back();
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  onCancel() {
    //this.eventObjFG.reset();
    // this.goBack();
    this.router.navigate(["/alumniList"]);
  }
}
