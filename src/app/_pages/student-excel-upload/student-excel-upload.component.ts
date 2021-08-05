import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../_services/authentication.service";
import { SpinnerService } from "../../_utils/spinner/spinner.service";
import { AppMessagesEn, StudentExcelEn } from "../../_helpers/app-messages-en";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { AppConstants } from "src/app/_helpers/app-constants";
import { StudentExcelUploadService } from "src/app/_services/student-excel-upload.service";

@Component({
  selector: "app-student-excel-upload",
  templateUrl: "./student-excel-upload.component.html",
  styleUrls: ["./student-excel-upload.component.css"]
})
export class StudentExcelUploadComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any = AppMessagesEn;
  AppMenuMessages: any;
  PageMessages: any;
  // User Session
  role: number = 0;
  userSession: any;

  fgUploadExcelFile: FormGroup;
  // Document
  currentFileToUpload: File;

  constructor(
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private studentExcelUploadService: StudentExcelUploadService,
    private formBuilder: FormBuilder
  ) {
    // User Auth
    // // this.userSession = this.authService.getUserData();
    // if (this.userSession) {
    //   this.role = this.userSession.role;
    // }
    // App Related
    this.AppMessages = AppMessagesEn;
    this.PageMessages = StudentExcelEn;
  }

  ngOnInit() {
    this.fgUploadExcelFileValidationFn();
  }
  fgUploadExcelFileValidationFn() {
    this.fgUploadExcelFile = this.formBuilder.group({
      docFile: new FormControl("", [Validators.compose([Validators.required])])
    });
  }
  onFileChange(event) {
    let files = event.target.files;
    this.currentFileToUpload = files[0];
  }

  fgUploadExcelFileSubmitFn() {
    this.authService.markFormGroupTouched(this.fgUploadExcelFile);

    if (
      this.fgUploadExcelFile.valid &&
      this.isValidFile(this.currentFileToUpload)
    ) {
      let modelObj: FormData = new FormData();
      modelObj.append("file", this.currentFileToUpload);
      this.studentExcelUploadService.excelUpload(modelObj).subscribe(
        data => {
          const responseData = data;
          //  console.log("dataaa" + JSON.stringify(responseData));
          if (
            responseData["status_code"] ===
            AppConstants.RESPONSE_STATUS_CODE_SUCCESS
          ) {
            this.authService.showSuccessMsgFn(responseData["status_message"]);
            this.fgUploadExcelFile.reset();
          } else {
            this.authService.showWarningMsgFn(responseData["status_message"]);
          }
          this.spinnerService.hide();
        },
        err => {
          this.spinnerService.hide();
          this.authService.showErrorMsgCommonFn(err);
        }
      );
    }
  }

  onChangeCompany(event) {
    const idcompany = event.target.value;
  }

  isValidFile(file: File): boolean {
    let isValid = false;

    const maxSizeLimit =
      AppConstants.FILE_UPLOAD_MAX_SIZE_LIMIT_MB * 1024 * 1024;
    const fileExtension = this.getFileExtension(file);
    const fileSize = file.size;
    const fileSizeInMB = (file.size / 1048576).toFixed(2);

    if (fileExtension === "xlsx" && fileSize < maxSizeLimit) {
      isValid = true;
    } else {
      var txt = "File type : " + fileExtension + "\n";
      txt += "Size: " + fileSizeInMB + " MB \n";
      txt += this.AppMessages.msg_error_doc_upload_formats_and_size;
      alert(txt);
    }
    return isValid;
  }

  getFileExtension(file: File) {
    const fileName = file.name;
    const fileExt = fileName
      .split(".")
    [fileName.split(".").length - 1].toLowerCase();
    return fileExt;
  }

  onClickwriteExcle() {
    this.studentExcelUploadService.excelWriting();
  }
}
