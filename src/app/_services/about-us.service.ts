import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AboutUs } from '../_models/about-Us';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {
  public static readonly URL_POST_ABOUTUS_SAVE =
    environment.apiUrl + "/api/aboutUs/save";
  public static readonly URL_GET_ABOUTUS =
    environment.apiUrl + "/api/aboutUs/list";
  public static readonly URL_POST_ABOUTUS_UPDATE =
    environment.apiUrl + "/api/aboutUs/update";
  public static readonly URL_GET_ABOUTUS_BY_ID =
    environment.apiUrl + "/api/aboutUs/get";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }
  save(modelObject: AboutUs) {
    //  let userToken = this.authService.getUserData();
    let urlToCall = AboutUsService.URL_POST_ABOUTUS_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  getList(pageno: number, limit: number) {
    //let userToken = this.authService.getUserData();
    let urlToCall = AboutUsService.URL_GET_ABOUTUS + "/" + pageno + "/" + limit;

    return this.http.get(urlToCall);
    //console.log(urlToCall);
  }

  update(modelObject: AboutUs) {
    // let userToken = this.authService.getUserData();
    let urlToCall = AboutUsService.URL_POST_ABOUTUS_UPDATE;
    return this.http.post(urlToCall, modelObject);
  }
  getById(id: number) {
    let urlToCall = AboutUsService.URL_GET_ABOUTUS_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }
}

