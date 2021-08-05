import { Component, OnInit, ViewChild } from '@angular/core';
import { AppConstants } from 'src/app/_helpers/app-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SpinnerService } from 'src/app/_utils/spinner/spinner.service';
import { AppMessagesEn } from 'src/app/_helpers/app-messages-en';
import { AboutUs } from 'src/app/_models/about-Us';
import { AboutUsService } from 'src/app/_services/about-us.service';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-about-us-save-update',
  templateUrl: './about-us-save-update.component.html',
  styleUrls: ['./about-us-save-update.component.css']
})
export class AboutUsSaveUpdateComponent implements OnInit {
  public Editor = ClassicEditor;
  AppConstants: any = AppConstants;
  AppMessages: any;
  aboutUsObjFG: FormGroup;
  About_us: AboutUs = new AboutUs();
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
    private aboutUsService: AboutUsService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idaboutUs === 0) {
        this.id = params.idaboutUs;
        this.About_us.idaboutUs = this.id;
        // this.eventObj.idquotes = this.id;
      } else if (params.idaboutUs > 0) {
        this.id = params.idaboutUs;
        this.About_us.idaboutUs = this.id;
        //this.eventObj.idquotes = this.id;
        this.getHistoryByid(this.id);
      }
    });


  }

  ngOnInit() {
    this.formObj1FormValidate();
    this.getHistoryByid(1);
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }


  formObj1FormValidate() {
    this.aboutUsObjFG = this.formBuilder.group({
      content: new FormControl(this.About_us.content, [
        Validators.compose([Validators.required])
      ])
    });
  }
  getHistoryByid(id) {
    this.aboutUsService.getById(id).subscribe(
      data => {
        //console.log(data);
        // this.statusImageUpload = true;
        this.updateButton = true;
        const responseData = data;
        this.About_us = responseData["data"] as AboutUs;
        this.aboutUsObjFG.patchValue(this.About_us);
        // this.getGalleryImageById(this.id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        console.log(error);
      }
    );
  }
  saveFormAbouUsSubmit() {
    this.authService.markFormGroupTouched(this.aboutUsObjFG);
    //console.log(this.aboutUsObjFG);
    if (this.aboutUsObjFG.valid) {
      this.About_us = this.aboutUsObjFG.value;
      this.About_us.idaboutUs = this.id;
      //   console.log("id......" + this.id);

      if (this.id > 0) {
        this.aboutUsService.update(this.About_us).subscribe(
          data => {
            // console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            //  console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.authService.showSuccessMsgFn(
                "About_Us Updated SuccessFully"
              );
              this.About_us = responseData["data"] as AboutUs;
              this.router.navigate(["/aboutus"]);
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
    this.router.navigateByUrl("/aboutus");
  }
}
