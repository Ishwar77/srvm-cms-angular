import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Testimonials } from "../_models/testimonials";
import { AppConstants } from "../_helpers/app-constants";

@Injectable({
  providedIn: "root"
})
export class TestimonialsService {
  AppConstants: any = AppConstants;
  AppMessages: any;
  rolesArray: any[] = [];
  // public static readonly URL_GET_IMAGE_LIST_PUBLISHED =
  //   environment.apiUrl + "/api/gallery/list";
  // public static readonly URL_GET_QUOTES_IMAGE_UPLOAD =
  //   environment.apiUrl + "/api/quotes/image-upload";
  // public static readonly URL_GET_QUOTES_IMAGE_UPLOAD_BY_ID =
  //   environment.apiUrl + "/api/quotes/profile-image/base64";
  public static readonly URL_POST_QUOTES_SAVE =
    environment.apiUrl + "/api/testimonials/save";
  public static readonly URL_POST_TESTIMONIALS_UPDATE =
    environment.apiUrl + "/api/testimonials/update";

  public static readonly URL_GET_TESTIMONIALS_LIST =
    environment.apiUrl + "/api/testimonials/list";
  public static readonly URL_GET_TESTIMONIALS_DELETE =
    environment.apiUrl + "/api/testimonials/delete";
  public static readonly URL_GET_TESTIMONIALS_BY_ID =
    environment.apiUrl + "/api/testimonials/get";
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}
  getList(pageno: number, limit: number) {
    let userToken = this.authService.getUserData();
    let urlToCall =
      TestimonialsService.URL_GET_TESTIMONIALS_LIST +
      "/" +
      pageno +
      "/" +
      limit;
    return this.http.get(urlToCall);
  }

  save(modelObject: Testimonials) {
    let userToken = this.authService.getUserData();
    let urlToCall = TestimonialsService.URL_POST_QUOTES_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  update(modelObject: Testimonials) {
    let userToken = this.authService.getUserData();
    let urlToCall = TestimonialsService.URL_POST_TESTIMONIALS_UPDATE;
    return this.http.post(urlToCall, modelObject);
  }

  getById(id: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = TestimonialsService.URL_GET_TESTIMONIALS_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

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
    let urlToCall = TestimonialsService.URL_GET_TESTIMONIALS_DELETE + "/" + id;
    return this.http.get(urlToCall);
  }

  // getById(id: number) {
  //   let urlToCall = QuotesService.URL_GET_QUOTES_BY_ID + "/" + id;
  //   return this.http.get(urlToCall);
  // }
}
