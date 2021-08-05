import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DateFormatService } from "src/app/_services/date-format.service";
import { Gallery } from "src/app/_models/gallery.model";
import { HostListener } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}
@Component({
  selector: "app-dialog-gallery-details",
  templateUrl: "./dialog-gallery-details.component.html",
  styleUrls: ["./dialog-gallery-details.component.css"]
})
export class DialogGalleryDetailsComponent implements OnInit {
  gallaryobj: Gallery;
  imagesLength;
  indexNum: number;

  constructor(private _sanitizationService: DomSanitizer,
    public dialogRef: MatDialogRef<DialogGalleryDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dateFormatService: DateFormatService
  ) {
    //console.log(data);
    let galleryList = data["galleryObj"];
    let galleryIndex = data["index"];
    this.imagesLength = galleryList.length;
    this.indexNum = galleryIndex;
    this.gallaryobj = galleryList[galleryIndex];

    // data.forEach(function(item, index) {
    //   console.log("$$$$$$$$$$$$$$$$$$$ foreach");
    //   console.log("Current: " + index);
    // });

    // for (var i = 0; i < data.length; i++) {
    //   console.log("------------------------------");
    //   console.log(data[i]);
    //   this.gallaryobj = data[i];
    // }

    //this.gallaryobj = data;
  }

  ngOnInit() { }
  // videosanitizer(value) {

  //   return this._sanitizationService.bypassSecurityTrustResourceUrl(value);

  // }
  imgOnClick(status) {

    let galleryList = this.data["galleryObj"];
    if (status == "prev" && this.indexNum > 0) {
      --this.indexNum;
    } else if (
      status == "next" &&
      (this.indexNum == 0 || this.indexNum < this.imagesLength - 1)
    ) {

      ++this.indexNum;
    }
    this.gallaryobj = galleryList[this.indexNum];
  }

  getDateFormat(date: Date) {
    var dateFormat = this.dateFormatService.formatDate(date);
    return dateFormat;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (
      event.keyCode === KEY_CODE.RIGHT_ARROW &&
      (this.indexNum == 0 || this.indexNum < this.imagesLength - 1)
    ) {
      this.imgOnClick("next");
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW && this.indexNum != 0) {
      this.imgOnClick("prev");
    }
  }
}
