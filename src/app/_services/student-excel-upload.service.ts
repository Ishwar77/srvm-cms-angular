import { Injectable } from "@angular/core";
import { AuthenticationService } from "./authentication.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { AppConstants } from "../_helpers/app-constants";
import { Student } from "../_models/student.model";

@Injectable({
  providedIn: "root"
})
export class StudentExcelUploadService {
  public static readonly URL_POST_EXECEL_UPLOAD_ONLY =
    environment.apiUrl + "/api/admin/student/excel-upload";

  public static readonly URL_POST_EXECEL_WRITE_ONLY =
    environment.apiUrl + "/api/admin/student/excel-writing";

  public static readonly URL_POST_EXECEL_WRITE_BY_SEARCH =
    environment.apiUrl + "/api/admin/student/excel-writing/by-search";

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  excelUpload(modelObj: any) {
    modelObj = this.authService.trimFormValues(modelObj);
    var reqOptionsUploadConfig = this.reqOptionsUploadConfigFn();
    let urlToCall = StudentExcelUploadService.URL_POST_EXECEL_UPLOAD_ONLY;
    return this.http.post(urlToCall, modelObj, reqOptionsUploadConfig);
  }

  reqOptionsUploadConfigFn() {
    let headers = new HttpHeaders();
    // headers = headers.append("gigmostoken", AppConstants.GIGMOS_TOKEN);
    headers = headers.append("srvmtoken", AppConstants.SRVM_TOKEN);
    var config = { headers: headers };
    return config;
  }

  excelWriting() {
    let urlToCall = StudentExcelUploadService.URL_POST_EXECEL_WRITE_ONLY;
    // return this.http.get(urlToCall);
    var xhr = new XMLHttpRequest();

    xhr.open("GET", urlToCall, true);
    // headers
    xhr = this.xhrOptionsConfigFn(xhr);
    xhr.responseType = "blob";

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // window.open(fileLink);
          let blob = new Blob([xhr.response], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          let filename = "SRVM_ALUMNI_LIST";

          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;

          document.body.appendChild(link);

          link.click();

          document.body.removeChild(link);
        } else {
          console.error(xhr.statusText);
        }
      }
    };

    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send();
  }

  xhrOptionsConfigFn(xhr) {
    //   xhr.setRequestHeader("tasawetoken", AppConstants.GIGMOS_TOKEN);
    xhr.setRequestHeader("srvmtoken", AppConstants.SRVM_TOKEN);
    return xhr;
  }

  xhrwriteOptionsConfigFn(xhrwrite) {
    //   xhr.setRequestHeader("tasawetoken", AppConstants.GIGMOS_TOKEN);
    xhrwrite.setRequestHeader("srvmtoken", AppConstants.SRVM_TOKEN);
    return xhrwrite;
  }

  excelWritingAsPerSearch(modelObject) {
    var batchfrom = modelObject.batch_from;
    var batchTo = modelObject.batch_to;
    var designation = modelObject.designation;
    var search = modelObject.search_text;
    var status = modelObject.status;
    // console.log("Servicesssssss.........excel");
    //  console.log(status);
    //  console.log("data download service");
    var param =
      "search=" +
      search +
      "&batchfrom=" +
      batchfrom +
      "&batchTo=" +
      batchTo +
      "&designation=" +
      designation +
      "&status=" +
      status;
    console.log(param);
    let urlToCall =
      StudentExcelUploadService.URL_POST_EXECEL_WRITE_BY_SEARCH + "?" + param;
    // return this.http.get(urlToCall);
    var xhrwrite = new XMLHttpRequest();

    xhrwrite.open("POST", urlToCall, true);
    // headers
    xhrwrite = this.xhrwriteOptionsConfigFn(xhrwrite);
    xhrwrite.responseType = "blob";

    xhrwrite.onload = function (e) {
      if (xhrwrite.readyState === 4) {
        if (xhrwrite.status === 200) {
          // window.open(fileLink);
          let blob = new Blob([xhrwrite.response], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          let filename = "SRVM_ALUMNI_LIST";

          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;

          document.body.appendChild(link);

          link.click();

          document.body.removeChild(link);
        } else {
          console.error(xhrwrite.statusText);
        }
      }
    };

    xhrwrite.onerror = function (e) {
      console.error(xhrwrite.statusText);
    };
    xhrwrite.send(param);
  }
}
