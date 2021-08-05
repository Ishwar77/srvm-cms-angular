import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmissionformactivService {
  public static readonly URL_ADMISSION_FORM_VISIBLE_DISABLE_UPDATE =
    environment.apiUrl + "/api/admissionFormActive/update";

  public static readonly URL_ADMISSION_FORM_VISIBLE_DISABLE_GETLIST =
    environment.apiUrl + "/api/admissionFormActive/list";

  constructor(private http: HttpClient) { }

  visibleDisable(modelObject) {
    // console.log(modelObject)
    let urlToCall = AdmissionformactivService.URL_ADMISSION_FORM_VISIBLE_DISABLE_UPDATE;
    return this.http.post(urlToCall, modelObject);
  }

  getList(pageno: number, limit: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall = AdmissionformactivService.URL_ADMISSION_FORM_VISIBLE_DISABLE_GETLIST + "/" + pageno + "/" + limit;

    return this.http.get(urlToCall);
    //  console.log(urlToCall);
  }
}
