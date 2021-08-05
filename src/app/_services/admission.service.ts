import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Admission } from '../_models/admission';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  public static readonly URL_POST_Admission_SAVE =
    environment.apiUrl + "/api/admission/save";
  public static readonly URL_GET_Admission =
    environment.apiUrl + "/api/admission/list";
  public static readonly URL_POST_Admission_UPDATE =
    environment.apiUrl + "/api/admission/update";
  public static readonly URL_GET_Admission_BY_ID =
    environment.apiUrl + "/api/admission/get";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }
  save(modelObject: Admission) {
    //  let userToken = this.authService.getUserData();
    let urlToCall = AdmissionService.URL_POST_Admission_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  getList(pageno: number, limit: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall = AdmissionService.URL_GET_Admission + "/" + pageno + "/" + limit;

    return this.http.get(urlToCall);
    //console.log(urlToCall);
  }

  update(modelObject: Admission) {
    // let userToken = this.authService.getUserData();
    let urlToCall = AdmissionService.URL_POST_Admission_UPDATE;
    return this.http.post(urlToCall, modelObject);
  }
  getById(id: number) {
    let urlToCall = AdmissionService.URL_GET_Admission_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }
}

