import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/_helpers/app-constants';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SpinnerService } from 'src/app/_utils/spinner/spinner.service';
import { AppMessagesEn } from 'src/app/_helpers/app-messages-en';
import { Admission } from 'src/app/_models/admission';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AdmissionService } from 'src/app/_services/admission.service';
@Component({
  selector: 'app-admission-update',
  templateUrl: './admission-update.component.html',
  styleUrls: ['./admission-update.component.css']
})
export class AdmissionUpdateComponent implements OnInit {
  public Editor = ClassicEditor;
  AppConstants: any = AppConstants;
  AppMessages: any;
  AdmissionObjFG: FormGroup;
  Admission: Admission = new Admission();
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
    private AdmissionService: AdmissionService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idadmission === 0) {
        this.id = params.idadmission;
        this.Admission.idadmission = this.id;
        // this.eventObj.idquotes = this.id;
      } else if (params.idadmission > 0) {
        this.id = params.idadmission;
        this.Admission.idadmission = this.id;
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
    //  console.log("onChange");
    //this.log += new Date() + "<br />";
  }


  formObj1FormValidate() {
    this.AdmissionObjFG = this.formBuilder.group({
      content: new FormControl(this.Admission.content, [
        Validators.compose([Validators.required])
      ])
    });
  }
  getHistoryByid(id) {
    this.AdmissionService.getById(id).subscribe(
      data => {
        // console.log(data);
        // this.statusImageUpload = true;
        this.updateButton = true;
        const responseData = data;
        this.Admission = responseData["data"] as Admission;
        this.AdmissionObjFG.patchValue(this.Admission);
        // this.getGalleryImageById(this.id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        console.log(error);
      }
    );
  }
  saveFormAdmissionSubmit() {
    this.authService.markFormGroupTouched(this.AdmissionObjFG);
    //console.log(this.AdmissionObjFG);
    if (this.AdmissionObjFG.valid) {
      this.Admission = this.AdmissionObjFG.value;
      this.Admission.idadmission = this.id;
      //   console.log("id......" + this.id);

      if (this.id > 0) {
        this.AdmissionService.update(this.Admission).subscribe(
          data => {
            // console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            //  console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.authService.showSuccessMsgFn(
                "Admission Updated SuccessFully"
              );
              this.Admission = responseData["data"] as Admission;
              this.router.navigate(["/admission"]);
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
    this.router.navigateByUrl("/admission");
  }
}

