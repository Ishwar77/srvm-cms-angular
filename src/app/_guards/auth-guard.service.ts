import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from "../_services/authentication.service";
import { AppConstants } from "../_helpers/app-constants";

@Injectable()
export class AuthGuardService {
  userDataSession: any;
  role = 0;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // logged in so return true
    // return true;

    const urlArray = route.url;

    // let firstParam:string = urlArray[0].path;
    let uptoTwoSegmentUrl: string = "";
    let fullUrl: string = "";
    if (urlArray.length > 1) {
      if (urlArray.length > 2) {
        uptoTwoSegmentUrl = urlArray[0].path + "/" + urlArray[1].path;
      }

      urlArray.forEach((element, index) => {
        fullUrl += element.path;
        let indexCurr: any = index;
        let urlArrayLength: any = urlArray.length - 1;
        if (indexCurr !== urlArrayLength) {
          fullUrl += "/";
        }

        if (indexCurr === 0 || indexCurr === 1) {
        }
      });
    }

    if (localStorage.getItem("gigmosuserweb")) {
      this.userDataSession = this.authService.getUserData();

      this.role = this.userDataSession.role;

      let urlAllowedArr = [];
      if (this.role === AppConstants.UROLE_ADMIN_ID) {
        urlAllowedArr = [
          "dashboard/admin",
          "admin/settings",
          "company/list",
          "company/save",
          "employee/list",
          "employee/save",
          "engagement/list",
          "engagement/engagement-billable",
          "engagement/prov-assignment",
          "requisition/list",
          "tickets/list",
          "tickets/update",
          "change/password/employee",
          "admin/reports/excel/download",
          "admin/excel/upload"
        ];
      } else {
        this.authService.removeToken();
      }

      if (urlAllowedArr.find(str => fullUrl.startsWith(str))) {
      } else {
 //  console.info("urlnotAllowedArr guard");        this.authService.navigateToHome();

        location.reload();
        this.authService.reloadPage();
      }

      // logged in so return true
      return true;
    } else {
 // console.log("--------guardddddddd");      location.reload();
      this.authService.reloadPage();
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"]);
    return false;
  }
}
