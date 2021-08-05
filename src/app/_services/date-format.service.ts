import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class DateFormatService {
  constructor() { }

  formatDate(date: Date): string {
    let dateString: string = moment(date)
      .format("DD MMM YYYY")
      .toString();
    // let dateString : string = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return dateString;
  }

  formatDateTime(date: Date): string {
    let dateString: string = moment(date)
      .format("DD MMM ")
      .toString();
    // let dateString : string = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return dateString;
  }

  formatTimeHH_mm(date: Date): string {
    let dateString: string = moment(date)
      .format("YYYY-MM-DD ")
      .toString();
    // let dateString : string = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return dateString;
  }

  parseDate(dateString: string) {
    let date: Date = moment(dateString, "YYYY-MM-DD").toDate();
    return date;
  }

  formatDateForm_YYYY_MM_DD(date: string): string {
    let dateString: string = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    return dateString;
  }

  formatDateTimeYYYY_MM_DD_HH_mm_ss(date: Date): string {
    let dateString: string = moment(date)
      .format("YYYY-MM-DD HH:mm:ss")
      .toString();
    // let dateString : string = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return dateString;
  }

  // formatDateInYYYYMMDD(date :Date) : string {
  //   let dateString : string =  date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  //   return dateString;
  // }

  //   parseDate(date :string) : Date {
  //     let dt : Date = new Date();
  //     return
  //   }

  // getDateStringForDateMonthYear(dateString, month, year) : string{
  //   return dateString + "/" + month + "/" + year;
  // }

  // getDateForDateMonthYear(dateString, month, year) : string{
  //   return  moment(new Date(year, month, dateString)).format("DD/MM/YYYY").toString();
  // }

  formatDate_dd_MM_yyyy(date: Date): string {
    let dateString: string = moment(date)
      .format("YYYY-MM-DD")
      .toString();
    // let dateString : string = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    return dateString;
  }
}
