import { Component } from "@angular/core";
import {
  MatDialogRef,
} from "@angular/material/dialog";
//import { DialogData } from '../event-list/event-list.component';
@Component({
  selector: "app-image-popup",
  templateUrl: "./image-popup.component.html",
  styleUrls: ["./image-popup.component.css"]
})
export class ImagePopupComponent {
  constructor(public dialogRef: MatDialogRef<ImagePopupComponent>) { }
  ngOnInit() {
    this.onNoClick();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
