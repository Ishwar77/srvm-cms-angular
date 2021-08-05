import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admission-form",
  templateUrl: "./admission-form.component.html",
  styleUrls: ["./admission-form.component.css"]
})
export class AdmissionFormComponent implements OnInit {
  // Document
  currentFileToUpload: File;

  constructor() {}

  ngOnInit() {}
}
