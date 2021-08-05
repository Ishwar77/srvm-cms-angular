import { Injectable } from "@angular/core";
import { Gallery } from "../_models/gallery.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GalleryService {
  public static readonly URL_GET_IMAGE_LIST_PUBLISHED =
    environment.apiUrl + "/api/gallery/list";
  public static readonly URL_GET_GALLERY_IMAGE_UPLOAD =
    environment.apiUrl + "/api/gallery/image-upload";
  public static readonly URL_GET_GALLERY_IMAGE_UPLOAD_BY_ID =
    environment.apiUrl + "/api/gallery/profile-image/base64";
  public static readonly URL_POST_GALLERY_SAVE =
    environment.apiUrl + "/api/gallery/save";
  public static readonly URL_GET_GALLERY_BY_ID =
    environment.apiUrl + "/api/gallery/get";
  public static readonly URL_GET_GALLERY_LIST_BY_USER =
    environment.apiUrl + "/api/gallery/byUser/list";
  public static readonly URL_GET_GALLERY_DELETE =
    environment.apiUrl + "/api/gallery/delete";

  public static readonly URL_GET_GALLERY_CATEGORY_LIST =
    environment.apiUrl + "/api/galleryCategory/list";
  public static readonly URL_GET_GALLERY_LIST_CATEGORY_BY_ID =
    environment.apiUrl + "/api/gallery/listById";

  public static readonly URL_GET_GALLERY_LIST_BY_IDS =
    environment.apiUrl + "/api/gallery/list/categoryId";

  public static readonly URL_GET_GALLERY_LIST_BY_GALLERY_ID =
    environment.apiUrl + "/api/gallery/list-gallery-id";

  public static readonly URL_GET_GALLERY_LATEST_IMAGE_BY_ID =
    environment.apiUrl + "/api/gallery/list-gallery_latest_images";

  public static readonly URL_POST_GALLERY_DELETE_BY_ID =
    environment.apiUrl + "/api/gallery/deleteById";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private httpClient: HttpClient
  ) { }
  getImage(pageno: number, limit: number) {
    // let userToken = this.authService.getUserData();
    let urlToCall =
      GalleryService.URL_GET_IMAGE_LIST_PUBLISHED + "/" + pageno + "/" + limit;
    return this.http.get(urlToCall);
  }
  imageUpload(modelObject: Gallery) {
    //let userToken = this.authService.getUserToken();
    // console.log("step 6" + "--- Folder Path");
    return this.http.post(
      GalleryService.URL_GET_GALLERY_IMAGE_UPLOAD,
      modelObject
    );
  }
  getGalleryImageById(id: number) {
    let urlToCall =
      GalleryService.URL_GET_GALLERY_IMAGE_UPLOAD_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  saveOrUpdate(modelObject: Gallery) {
    let userToken = this.authService.getUserData();
    let urlToCall = GalleryService.URL_POST_GALLERY_SAVE;
    return this.http.post(urlToCall, modelObject);
  }
  getById(id: number) {
    let userToken = this.authService.getUserData();
    let urlToCall = GalleryService.URL_GET_GALLERY_BY_ID + "/" + id;
    return this.http.get(urlToCall);
  }

  getGalleryListByUser() {
    let urlToCall = GalleryService.URL_GET_GALLERY_LIST_BY_USER;
    return this.http.get(urlToCall);
  }

  //   getGalleryImageByAssetsFolder(id: number) {
  //     let urlToCall = GalleryService.URL_GET_GALLERY_IMAGE_UPLOAD_ASSEST_FOLDER;
  //     return this.http.get(urlToCall);
  //   }
  // delete(modelObject: Gallery) {
  //   let userToken = this.authService.getUserData();
  //   let urlToCall = GalleryService.URL_GET_GALLERY_DELETE;
  //   return this.http.get(urlToCall, modelObject);
  // }

  delete(modelObject: Gallery) {
    //  console.log(modelObject);
    let urltoCall = GalleryService.URL_GET_GALLERY_DELETE;
    return this.http.post(urltoCall, modelObject);
  }

  deleteById(modelObject: Gallery) {
    // console.log(JSON.stringify(modelObject));
    let userToken = this.authService.getUserData();
    let urlToCall = GalleryService.URL_POST_GALLERY_DELETE_BY_ID;
    return this.http.post(urlToCall, modelObject);
  }

  getGalleryCategoryList() {
    let urlToCall = GalleryService.URL_GET_GALLERY_CATEGORY_LIST;
    return this.http.get(urlToCall);
  }

  getGalleryListBycategoryId(id: number) {
    let urltoCall =
      GalleryService.URL_GET_GALLERY_LIST_CATEGORY_BY_ID + "/" + id;
    return this.http.get(urltoCall);
  }

  getGalleryListByIds(modelObject: Gallery) {
    let urltoCall = GalleryService.URL_GET_GALLERY_LIST_BY_IDS;
    return this.http.post(urltoCall, modelObject);
  }

  getGalleryListBygalleryId() {
    let urltoCall = GalleryService.URL_GET_GALLERY_LIST_BY_GALLERY_ID;
    return this.http.get(urltoCall);
  }

  getGalleryLatestImageById(id: number) {
    let urltoCall =
      GalleryService.URL_GET_GALLERY_LATEST_IMAGE_BY_ID + "/" + id;
    return this.http.get(urltoCall);
  }
}
