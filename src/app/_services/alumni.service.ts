import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Student } from "../_models/student.model";

@Injectable({
  providedIn: "root"
})
export class AlumniService {
  public static readonly URL_POST_STUDENT_SAVE_NEW_REGISTER_ALUMNI =
    environment.apiUrl + "/api/noLogin/alumni/saveorUpdate";
  public static readonly URL_GET_STUDENT_IMAGE_UPLOAD_BY_ALUMNI =
    environment.apiUrl + "/api/alumini/image-upload";
  public static readonly URL_GET_STUDENT_IMAGE_UPLOAD_BY_ID =
    environment.apiUrl + "/api/alumini/profile-image/base64";

  public static readonly URL_GET_STUDENT_LAST_SUBMITTED_STATUS =
    environment.apiUrl + "/api/student/last-submitted";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  alumnisaveOrUpdate(modelObject: Student) {
    // let userToken = this.authService.getUserData();
    let urlToCall = AlumniService.URL_POST_STUDENT_SAVE_NEW_REGISTER_ALUMNI;
    return this.http.post(urlToCall, modelObject);
  }
  alumniimageUpload(modelObject: Student) {
    //let userToken = this.authService.getUserToken();
    return this.http.post(
      AlumniService.URL_GET_STUDENT_IMAGE_UPLOAD_BY_ALUMNI,
      modelObject
    );
  }

  getAlumniImageById(id: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall = AlumniService.URL_GET_STUDENT_IMAGE_UPLOAD_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  getStudentLastSubmitted(modelObject: Student) {
    // let userToken = this.authService.getUserData();
    let urlToCall = AlumniService.URL_GET_STUDENT_LAST_SUBMITTED_STATUS;
    return this.http.post(urlToCall, modelObject);
  }
}
