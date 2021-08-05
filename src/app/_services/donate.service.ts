import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Donate } from '../_models/donate';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  public static readonly URL_POST_ABOUTUS_SAVE =
    environment.apiUrl + "/api/donate/save";
  public static readonly URL_GET_ABOUTUS =
    environment.apiUrl + "/api/donate/list";
  public static readonly URL_POST_ABOUTUS_UPDATE =
    environment.apiUrl + "/api/donate/update";
  public static readonly URL_GET_ABOUTUS_BY_ID =
    environment.apiUrl + "/api/donate/get";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }
  save(modelObject: Donate) {
    //  let userToken = this.authService.getUserData();
    let urlToCall = DonateService.URL_POST_ABOUTUS_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  getList(pageno: number, limit: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall = DonateService.URL_GET_ABOUTUS + "/" + pageno + "/" + limit;

    return this.http.get(urlToCall);
    //  console.log(urlToCall);
  }

  update(modelObject: Donate) {

    // let userToken = this.authService.getUserData();
    let urlToCall = DonateService.URL_POST_ABOUTUS_UPDATE;
    return this.http.post(urlToCall, modelObject);
  }
  getById(id: number) {
    let urlToCall = DonateService.URL_GET_ABOUTUS_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }
}

