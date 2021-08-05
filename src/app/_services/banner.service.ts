import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Banner } from "../_models/banner";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
@Injectable({
  providedIn: "root"
})
export class BannerService {
  public static readonly URL_GET_BANNER_IMAGE_UPLOAD =
    environment.apiUrl + "/api/banner/image-upload";
  public static readonly URL_GET_BANNER_IMAGE_UPLOAD_LIST =
    environment.apiUrl + "/api/banner/banner-image/Assets/folder/base64";
  public static readonly URL_GET_BANNER_DELETE =
    environment.apiUrl + "/api/banner/delete";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  getImage() {
    let urlToCall = BannerService.URL_GET_BANNER_IMAGE_UPLOAD_LIST;
    return this.http.get(urlToCall);
  }

  imageUpload(modelObject: Banner) {
    //let userToken = this.authService.getUserToken();
    return this.http.post(
      BannerService.URL_GET_BANNER_IMAGE_UPLOAD,
      modelObject
    );
  }
  delete(id: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = BannerService.URL_GET_BANNER_DELETE + "/" + id;
    return this.http.get(urlToCall);
  }
}
