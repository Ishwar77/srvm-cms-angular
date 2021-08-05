import { Injectable } from "@angular/core";

import { AuthenticationService } from "./authentication.service";
import { environment } from "src/environments/environment.prod";
import { GalleryCategory } from "../_models/gallery-category";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GalleryCategoryService {
  public static readonly URL_POST_GALLERY_CATEGORY_SAVE =
    environment.apiUrl + "/api/galleryCategory/save";

  public static readonly URL_POST_GALLERY_CATEGORY_UPDATE =
    environment.apiUrl + "/api/galleryCategory/update";
  public static readonly URL_GET_GALLERY_CATEGORY_BY_ID =
    environment.apiUrl + "/api/galleryCategory/get";
  public static readonly URL_GET_GALLERY_DELETE =
    environment.apiUrl + "/api/galleryCategory/delete";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) {}

  save(modelObject: GalleryCategory) {
    let urlToCall = GalleryCategoryService.URL_POST_GALLERY_CATEGORY_SAVE;
    return this.http.post(urlToCall, modelObject);
  }

  update(modelObject: GalleryCategory) {
    let urlToCall = GalleryCategoryService.URL_POST_GALLERY_CATEGORY_UPDATE;
    return this.http.post(urlToCall, modelObject);
  }

  getById(id: number) {
    let urlToCall =
      GalleryCategoryService.URL_GET_GALLERY_CATEGORY_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  delete(id: number) {
    let urlToCall = GalleryCategoryService.URL_GET_GALLERY_DELETE + "/" + id;
    return this.http.get(urlToCall);
  }
}
