import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { environment } from "src/environments/environment";
import { HistoryData } from "../_models/history";

@Injectable({
  providedIn: "root"
})
export class HistoryService {
  public static readonly URL_POST_HISTORY_SAVE =
    environment.apiUrl + "/api/history/save";
  public static readonly URL_GET_HISTORY =
    environment.apiUrl + "/api/history/list";
  public static readonly URL_POST_HISTORY_UPDATE =
    environment.apiUrl + "/api/history/update";
  public static readonly URL_GET_HISTORY_BY_ID =
    environment.apiUrl + "/api/history/get";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  save(modelObject: HistoryData) {
    //  let userToken = this.authService.getUserData();
    let urlToCall = HistoryService.URL_POST_HISTORY_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  getList(pageno: number, limit: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall = HistoryService.URL_GET_HISTORY + "/" + pageno + "/" + limit;

    return this.http.get(urlToCall);
    console.log(urlToCall);
  }

  update(modelObject: HistoryData) {
    // let userToken = this.authService.getUserData();
    let urlToCall = HistoryService.URL_POST_HISTORY_UPDATE;
    return this.http.post(urlToCall, modelObject);
  }
  getById(id: number) {
    let urlToCall = HistoryService.URL_GET_HISTORY_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }
}
