import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Quotes } from "../_models/quotes";

@Injectable({
  providedIn: "root"
})
export class QuotesService {
  public static readonly URL_GET_IMAGE_LIST_PUBLISHED =
    environment.apiUrl + "/api/gallery/list";
  public static readonly URL_GET_QUOTES_IMAGE_UPLOAD =
    environment.apiUrl + "/api/quotes/image-upload";
  public static readonly URL_GET_QUOTES_IMAGE_UPLOAD_BY_ID =
    environment.apiUrl + "/api/quotes/profile-image/base64";
  public static readonly URL_POST_QUOTES_SAVE =
    environment.apiUrl + "/api/quotes/save";
  public static readonly URL_POST_QUOTES_UPDATE =
    environment.apiUrl + "/api/quotes/update";

  public static readonly URL_GET_QUOTES_IMAGE_UPLOAD_LIST =
    environment.apiUrl + "/api/quotes/profile-image/Assets/folder/base64";
  public static readonly URL_GET_QUOTES_DELETE =
    environment.apiUrl + "/api/quotes/delete";
  public static readonly URL_GET_QUOTES_BY_ID =
    environment.apiUrl + "/api/quotes/get";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}
  getList() {
    let urlToCall = QuotesService.URL_GET_QUOTES_IMAGE_UPLOAD_LIST;
    return this.http.get(urlToCall);
  }
  imageUpload(modelObject: Quotes) {
    return this.http.post(
      QuotesService.URL_GET_QUOTES_IMAGE_UPLOAD,
      modelObject
    );
  }
  getGalleryImageById(id: number) {
    let urlToCall = QuotesService.URL_GET_QUOTES_IMAGE_UPLOAD_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  save(modelObject: Quotes) {
    let userToken = this.authService.getUserData();
    let urlToCall = QuotesService.URL_POST_QUOTES_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  update(modelObject: Quotes) {
    let userToken = this.authService.getUserData();
    let urlToCall = QuotesService.URL_POST_QUOTES_UPDATE;
    return this.http.post(urlToCall, modelObject);
  }

  // getById(id: number) {
  //   let userToken = this.authService.getUserData();
  //   let urlToCall = QuotesService.URL_GET_QUOTES_BY_ID + "/" + id;
  //   return this.http.get(urlToCall);
  // }

  // getGalleryListByUser() {
  //   let urlToCall = QuotesService.URL_GET_QUOTES_LIST_BY_USER;
  //   return this.http.get(urlToCall);
  // }

  //   getGalleryImageByAssetsFolder(id: number) {
  //     let urlToCall = QuotesService.URL_GET_GALLERY_IMAGE_UPLOAD_ASSEST_FOLDER;
  //     return this.http.get(urlToCall);
  //   }
  delete(id: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = QuotesService.URL_GET_QUOTES_DELETE + "/" + id;
    return this.http.get(urlToCall);
  }

  getById(id: number) {
    let urlToCall = QuotesService.URL_GET_QUOTES_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }
}
