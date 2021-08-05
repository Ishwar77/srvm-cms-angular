import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { AppConstants } from "src/app/_helpers/app-constants";
import { HistoryService } from "src/app/_services/history.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { HistoryData } from "src/app/_models/history";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
@Component({
  selector: "app-history-save-update",
  templateUrl: "./history-save-update.component.html",
  styleUrls: ["./history-save-update.component.css"]
})
export class HistorySaveUpdateComponent implements OnInit {
  public Editor = ClassicEditor;
  AppConstants: any = AppConstants;
  AppMessages: any;
  historyObjFG: FormGroup;
  historyObj: HistoryData = new HistoryData();
  updateButton: boolean = false;
  id: number;
  ckEdiorConfig = {
    extraPlugins: 'filebrowser',
    // mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
    mathJaxLib: '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
    mathJaxClass: 'equation',
    filebrowserBrowseUrl: 'EditFM/index.html?type=image',
    filebrowserUploadUrl: 'filemanager/upload/defaults',
    filebrowserImageBrowseUrl: 'EditFM/index.html?type=image',
    toolbarGroups: [
      { 'name': 'clipboard', 'groups': ['clipboard', 'undo'] },
      { 'name': 'editing', 'groups': ['find', 'selection', 'spellchecker'] },
      { 'name': 'paragraph', 'groups': ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { 'name': 'document', 'groups': ['mode'] },
      { 'name': 'insert', 'groups': ['insert'] },
      { 'name': 'basicstyles', 'groups': ['basicstyles', 'cleanup'] },
      { 'name': 'styles', 'groups': ['styles'] },
      { 'name': 'colors' },
    ]
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private historyService: HistoryService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idhistory === 0) {
        this.id = params.idhistory;
        this.historyObj.idhistory = this.id;
        // this.eventObj.idquotes = this.id;
      } else if (params.idhistory > 0) {
        this.id = params.idhistory;
        this.historyObj.idhistory = this.id;
        //this.eventObj.idquotes = this.id;
        this.getHistoryByid(this.id);
      }
    });
  }

  ngOnInit() {
    this.formObj1FormValidate();
    this.getHistoryByid(1);
  }
  formObj1FormValidate() {
    this.historyObjFG = this.formBuilder.group({
      content: new FormControl(this.historyObj.content, [
        Validators.compose([Validators.required])
      ])
    });
  }
  getHistoryByid(id) {
    this.historyService.getById(id).subscribe(
      data => {
        //console.log(data);
        // this.statusImageUpload = true;
        this.updateButton = true;
        const responseData = data;
        this.historyObj = responseData["data"] as HistoryData;
        this.historyObjFG.patchValue(this.historyObj);
        // this.getGalleryImageById(this.id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        console.log(error);
      }
    );
  }
  saveFormHistorySubmit() {
    this.authService.markFormGroupTouched(this.historyObjFG);
    // console.log(this.historyObjFG);
    if (this.historyObjFG.valid) {
      this.historyObj = this.historyObjFG.value;
      this.historyObj.idhistory = this.id;
      //   console.log("id......" + this.id);

      if (this.id > 0) {
        this.historyService.update(this.historyObj).subscribe(
          data => {
            // console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            //  console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.authService.showSuccessMsgFn(
                "Your History Updated SuccessFully"
              );
              this.historyObj = responseData["data"] as HistoryData;
              this.router.navigate(["/history"]);
            } else {
              this.authService.showWarningMsgFn(
                this.AppMessages.res_msg_status_error
              );
            }
            this.spinnerService.hide();
          },
          err => {
            this.spinnerService.hide();
            this.authService.showErrorMsgCommonFn(err);
          }
        );
      }
    }
  }
  onCancel() {
    this.router.navigateByUrl("/history");
  }
}
