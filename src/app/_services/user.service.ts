import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { AppConstants } from "../_helpers/app-constants";
import { User } from "../_models/user.model";
import { environment } from "src/environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  AppConstants: any = AppConstants;
  AppMessages: any;
  rolesArray: any[] = [];

  public static readonly URL_GET_USER_LIST =
    environment.apiUrl + "/api/user/list";
  public static readonly URL_GET_USER_SAVE_UPADTE =
    environment.apiUrl + "/api/signup/user";
  public static readonly URL_GET_USER_DELETE =
    environment.apiUrl + "/api/user/delete";
  public static readonly URL_GET_USER_BY_ID =
    environment.apiUrl + "/api/user/get";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  saveOrUpdate(modelObject: User) {
    let userToken = this.authService.getUserData();
    let urlToCall = UserService.URL_GET_USER_SAVE_UPADTE;
    return this.http.post(urlToCall, modelObject);
  }
  getList(pageno: number, limit: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = UserService.URL_GET_USER_LIST + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }
  delete(id: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = UserService.URL_GET_USER_DELETE + "/" + id;
    return this.http.get(urlToCall);
  }
  getById(id: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = UserService.URL_GET_USER_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }
}
