import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { AppConstants } from "../_helpers/app-constants";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Student } from "../_models/student.model";

@Injectable({
  providedIn: "root"
})
export class StudentService {
  AppConstants: any = AppConstants;
  AppMessages: any;
  rolesArray: any[] = [];

  public static readonly URL_GET_STUDENT_LIST =
    environment.apiUrl + "/api/student/list";
  public static readonly URL_POST_STUDENT_SAVE =
    environment.apiUrl + "/api/student/save";
  public static readonly URL_PUT_STUDENT_SAVE =
    environment.apiUrl + "/api/student/update";
  public static readonly URL_GET_STUDENT_BY_ID =
    environment.apiUrl + "/api/student/get";
  public static readonly URL_GET_STUDENT_DELETE =
    environment.apiUrl + "/api/student/delete";
  public static readonly URL_GET_STUDENT_IMAGE_UPLOAD =
    environment.apiUrl + "/api/student/image-upload";
  public static readonly URL_GET_STUDENT_IMAGE_UPLOAD_BY_ID =
    environment.apiUrl + "/api/student/profile-image/base64";

  //rejected-approved-pending

  public static readonly URL_GET_STUDENT_PENDING_LIST =
    environment.apiUrl + "/api/student/pending";
  public static readonly URL_POST_STUDENT_APPROVED_LIST =
    environment.apiUrl + "/api/student/approved";
  public static readonly URL_GET_STUDENT_REJECTED_LIST =
    environment.apiUrl + "/api/student/rejected";
  public static readonly URL_GET_STUDENT_APPROVED_REJECT_STATUS =
    environment.apiUrl + "/api/student/approved-rejected";
  public static readonly URL_GET_STUDENT_LAST_SUBMITTED_STATUS =
    environment.apiUrl + "/api/student/last-submitted";
  public static readonly URL_GET_STUDENT_DELETE_REJECT_DATA =
    environment.apiUrl + "/api/student/rejectedData/delete";

  public static readonly URL_GET_ALUMNI_LIST_SEARCH_BY_BATCH_SELECTION =
    environment.apiUrl + "/api/student/list-search-by/batch-selection";

  public static readonly URL_GET_ALUMNI_LIST_SEARCH_BY_ID_NAME =
    environment.apiUrl + "/api/student/list-search-by/id-name-selection";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  pendingList(pageno: number, limit: number) {
    let userToken = this.authService.getUserData();
    let urlToCall =
      StudentService.URL_GET_STUDENT_PENDING_LIST + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }

  approvedList(pageno: number, limit: number) {
    // let userToken = this.authService.getUserData();
    let urlToCall =
      StudentService.URL_POST_STUDENT_APPROVED_LIST +
      "/" +
      pageno +
      "/" +
      limit;
    return this.http.get(urlToCall);
  }

  rejectedList(pageno: number, limit: number) {
    // let userToken = this.authService.getUserData();
    let urlToCall =
      StudentService.URL_GET_STUDENT_REJECTED_LIST + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }

  save(modelObject: Student) {
    //console.log(modelObject);
    // let userToken = this.authService.getUserData();
    let urlToCall = StudentService.URL_POST_STUDENT_SAVE;
    return this.http.post(urlToCall, modelObject);
  }
  update(modelObject: Student) {
    // let userToken = this.authService.getUserData();
    let urlToCall = StudentService.URL_PUT_STUDENT_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  getById(id: number) {
    // let userToken = this.authService.getUserData();
    let urlToCall = StudentService.URL_GET_STUDENT_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  delete(id: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = StudentService.URL_GET_STUDENT_DELETE + "/" + id;
    return this.http.get(urlToCall);
  }

  imageUpload(modelObject: Student) {
    //let userToken = this.authService.getUserToken();
    return this.http.post(
      StudentService.URL_GET_STUDENT_IMAGE_UPLOAD,
      modelObject
    );
  }

  getStudentImageById(id: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall =
      StudentService.URL_GET_STUDENT_IMAGE_UPLOAD_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  approveRejectStatus(id: number, status) {
    let userToken = this.authService.getUserData();
    let urlToCall =
      StudentService.URL_GET_STUDENT_APPROVED_REJECT_STATUS +
      "/" +
      id +
      "/" +
      status;
    return this.http.get(urlToCall);
  }

  getStudentLastSubmitted() {
    // let userToken = this.authService.getUserData();
    let urlToCall = StudentService.URL_GET_STUDENT_LAST_SUBMITTED_STATUS;
    return this.http.get(urlToCall);
  }

  deleteRejectData(id: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall =
      StudentService.URL_GET_STUDENT_DELETE_REJECT_DATA + "/" + id;
    return this.http.get(urlToCall);
  }

  getAlumniListSearchbyBatchSelection(
    modelObject: Student,
    pageno: number,
    limit: number
  ) {
    // let userToken = this.authService.getUserData();
    let urlToCall =
      StudentService.URL_GET_ALUMNI_LIST_SEARCH_BY_BATCH_SELECTION +
      "/" +
      pageno +
      "/" +
      limit;
    return this.http.post(urlToCall, modelObject);
  }

  getAlumniListSearchbyIdorName(
    modelObject: Student,
    pageno: number,
    limit: number
  ) {
    // console.log(modelObject);
    // let userToken = this.authService.getUserData();
    let urlToCall =
      StudentService.URL_GET_ALUMNI_LIST_SEARCH_BY_ID_NAME +
      "/" +
      pageno +
      "/" +
      limit;
    return this.http.post(urlToCall, modelObject);
  }
}
