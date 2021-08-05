import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DateFormatService } from "src/app/_services/date-format.service";
import { Event } from "src/app/_models/event.model";

@Component({
  selector: "app-dialog-event-details",
  templateUrl: "./dialog-event-details.component.html",
  styleUrls: ["./dialog-event-details.component.css"]
})
export class DialogEventDetailsComponent implements OnInit {
  rowobj: any;

  isImageOpen = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEventDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dateFormatService: DateFormatService
  ) {
    // console.log("$$$$$$$$$$$$$$$$$$$");
    //console.log(data);
    this.rowobj = data;
    //  console;
  }

  ngOnInit() { }

  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
