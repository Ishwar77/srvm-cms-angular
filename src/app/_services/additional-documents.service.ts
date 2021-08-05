import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { AppConstants } from "../_helpers/app-constants";

@Injectable({
  providedIn: "root"
})
export class AdditionalDocumentsService {
  public static readonly URL_POST_DOC_UPLOAD_ONLY =
    environment.apiUrl + "/doc/upload/single";
  public static readonly URL_POST_DOC_DOWNLOAD_ONLY =
    environment.apiUrl + "/doc/get/single";
  public static readonly URL_POST_ADDITIONAL_DOC_UPLOAD =
    environment.apiUrl + "/user/register/doc/additional/upload/single";
  public static readonly URL_POST_ADDITIONAL_DOC_DOWN =
    environment.apiUrl + "/user/register/doc/additional/get/single";

  public static readonly URL_USER_ADDITIONAL_DOC_LIST =
    environment.apiUrl + "/user/doc/additional/list";
  public static readonly URL_WORKER_ADDITIONAL_DOC_LIST =
    environment.apiUrl + "/worker/doc/additional/list";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  docUploadOnly(modelObj: any) {
    modelObj = this.authService.trimFormValues(modelObj);
    var reqOptionsUploadConfig = this.reqOptionsUploadConfigFn();
    return this.http.post(
      AdditionalDocumentsService.URL_POST_DOC_UPLOAD_ONLY,
      modelObj,
      reqOptionsUploadConfig
    );
  }

  docDownloadOnly(modelObj: any) {
    modelObj = this.authService.trimFormValues(modelObj);
    return this.http.post(
      AdditionalDocumentsService.URL_POST_DOC_DOWNLOAD_ONLY,
      modelObj
    );
  }

  userRegAdditionalDocUpload(modelObj: any) {
    modelObj = this.authService.trimFormValues(modelObj);
    var reqOptionsUploadConfig = this.reqOptionsUploadConfigFn();
    return this.http.post(
      AdditionalDocumentsService.URL_POST_ADDITIONAL_DOC_UPLOAD,
      modelObj,
      reqOptionsUploadConfig
    );
  }

  userRegAdditionalDocDown(modelObj: any) {
    modelObj = this.authService.trimFormValues(modelObj);

    return this.http.post(
      AdditionalDocumentsService.URL_POST_ADDITIONAL_DOC_DOWN,
      modelObj
    );
  }

  userAdditionalDocList(modelObj: any) {
    modelObj = this.authService.trimFormValues(modelObj);

    let urlToCall = AdditionalDocumentsService.URL_USER_ADDITIONAL_DOC_LIST;
    return this.http.post(urlToCall, modelObj);
  }

  workerAdditionalDocList(modelObj: any) {
    modelObj = this.authService.trimFormValues(modelObj);

    let urlToCall = AdditionalDocumentsService.URL_WORKER_ADDITIONAL_DOC_LIST;
    return this.http.post(urlToCall, modelObj);
  }

  reqOptionsUploadConfigFn() {
    let headers = new HttpHeaders();
    // headers = headers.append("gigmostoken", AppConstants.GIGMOS_TOKEN);
    headers = headers.append("srvmtoken", AppConstants.SRVM_TOKEN);
    var config = { headers: headers };
    return config;
  }
}
