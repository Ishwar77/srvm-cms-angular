import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { AuthenticationService } from "./authentication.service";
import { AppConstants } from "../_helpers/app-constants";
import { ContactUs } from "../_models/contact-us.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ContactUsService {
  AppConstants: any = AppConstants;
  AppMessages: any;

  rolesArray: any[] = [];

  public static readonly URL_POST_CONTCATUS_SAVE =
    environment.apiUrl + "/api/contact/save";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  saveOrUpdate(modelObject: ContactUs) {
    console.log(modelObject)
    let userToken = this.authService.getUserData();

    let urlToCall = ContactUsService.URL_POST_CONTCATUS_SAVE;
    return this.http.post(urlToCall, modelObject);
  }
}
