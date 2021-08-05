import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/_helpers/app-constants';
import { Router, ActivatedRoute } from '@angular/router';
import { SpinnerService } from 'src/app/_utils/spinner/spinner.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Donate } from 'src/app/_models/donate';
import { DonateService } from 'src/app/_services/donate.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SnotifyService } from 'ng-snotify';
import { AppMessagesEn } from 'src/app/_helpers/app-messages-en';
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
@Component({
  selector: 'app-donate-update',
  templateUrl: './donate-update.component.html',
  styleUrls: ['./donate-update.component.css']
})
export class DonateUpdateComponent implements OnInit {

  public Editor = ClassicEditor;
  AppConstants: any = AppConstants;
  AppMessages: any;
  donateObjFG: FormGroup;
  donate: Donate = new Donate();
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
    private donateService: DonateService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.iddonate === 0) {
        this.id = params.iddonate;
        this.donate.iddonate = this.id;
        // this.eventObj.idquotes = this.id;
      } else if (params.iddonate > 0) {
        this.id = params.iddonate;
        this.donate.iddonate = this.id;
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
    this.donateObjFG = this.formBuilder.group({
      donate_text: new FormControl(this.donate.donate_text, [
        Validators.compose([Validators.required])
      ])
    });
  }
  getHistoryByid(id) {
    this.donateService.getById(id).subscribe(
      data => {
        //console.log(data);
        // this.statusImageUpload = true;
        this.updateButton = true;
        const responseData = data;
        this.donate = responseData["data"] as Donate;
        this.donateObjFG.patchValue(this.donate);
        // this.getGalleryImageById(this.id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        console.log(error);
      }
    );
  }
  saveFormDonateSubmit() {
    this.authService.markFormGroupTouched(this.donateObjFG);
    //console.log(this.aboutUsObjFG);
    if (this.donateObjFG.valid) {
      this.donate = this.donateObjFG.value;
      this.donate.iddonate = this.id;
      //   console.log("id......" + this.id);

      if (this.id > 0) {
        this.donateService.update(this.donate).subscribe(
          data => {
            // console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            //  console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.authService.showSuccessMsgFn(
                "Donate Updated SuccessFully"
              );
              this.donate = responseData["data"] as Donate;
              this.router.navigate(["/donate"]);
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
    this.router.navigateByUrl("/donate");
  }
}
