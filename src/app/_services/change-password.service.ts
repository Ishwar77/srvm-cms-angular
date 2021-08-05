import { Injectable } from "@angular/core";
import { AppConstants } from "../_helpers/app-constants";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { User } from "../_models/user.model";

@Injectable({
  providedIn: "root"
})
export class ChangePasswordService {
  AppConstants: any = AppConstants;
  AppMessages: any;

  rolesArray: any[] = [];

  public static readonly URL_POST_CHANGE_PASSOWRD =
    environment.apiUrl + "/api/user/change-password";

  public static readonly CHANGE_PASSWORD_URL =
    environment.apiUrl + "/api/user/change-password/otp";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  changePassword(modelObject: User) {
    modelObject = this.authService.trimFormValues(modelObject);
    let urlToCall = ChangePasswordService.URL_POST_CHANGE_PASSOWRD;
    return this.http.post(urlToCall, modelObject);
  }

  ChangePasswordOnOTPVerification(modelObject: User) {
    // modelObject = this.authService.trimFormValues(modelObject);
    let urlToCall = AuthenticationService.CHANGE_PASSWORD_URL;
    return this.http.post(urlToCall, modelObject);
  }
}
