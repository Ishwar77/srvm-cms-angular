import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AuthenticationService } from "../_services/authentication.service";
import { AppConstants } from "../_helpers/app-constants";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.headers.has("gigmostoken")) {
      var reqOptionsConfig = this.reqOptionsConfigFn();
      request = request.clone(reqOptionsConfig);
    } else {
      var reqOptionsConfig = this.reqOptionsUploadConfigFn();
      request = request.clone(reqOptionsConfig);
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Handle Response
          // console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error.reason ? error.error.reason : "",
          status: error.status
        };
        // this.errorDialogService.openDialog(data);
        return throwError(error);
      })
    );
  }

  reqOptionsConfigFn() {
    let headers = new HttpHeaders();
    headers = headers.append(
      "Authorization",
      "Basic " + btoa("sbl_apiuser:password")
    );
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Cache-Control", "no-cache");
    //  headers = headers.append("tasaweToken", AppConstants.GIGMOS_TOKEN);
    headers = headers.append("srvmtoken", AppConstants.SRVM_TOKEN);
    let accesstoken = this.authService.getAccessToken();
    headers = headers.append("x-access-token", accesstoken);

    var reqOptionsConfig = { headers: headers };
    return reqOptionsConfig;
  }

  reqOptionsUploadConfigFn() {
    let headers = new HttpHeaders();
    // headers = headers.append('Content-Type', 'multipart/form-data');
    headers = headers.append(
      "Authorization",
      "Basic " + btoa("sbl_apiuser:password")
    );
    headers = headers.append("Cache-Control", "no-cache");
    //headers = headers.append("tasaweToken", AppConstants.GIGMOS_TOKEN);
    headers = headers.append("srvmtoken", AppConstants.SRVM_TOKEN);
    let accesstoken = this.authService.getAccessToken();
    // console.log("token----------------");
    // console.log(accesstoken);
    headers = headers.append("x-access-token", accesstoken);

    var config = { headers: headers };
    return config;
  }
}
