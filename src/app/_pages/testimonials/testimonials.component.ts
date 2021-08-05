import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";

import { AppMessagesEn } from "src/app/_helpers/app-messages-en";

import { Testimonials } from "src/app/_models/testimonials";
import { TestimonialsService } from "src/app/_services/testimonials.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: "app-testimonials",
  templateUrl: "./testimonials.component.html",
  styleUrls: ["./testimonials.component.css"]
})
export class TestimonialsComponent implements OnInit {
  public Editor = ClassicEditor;
  AppConstants: any = AppConstants;
  AppMessages: any;
  imageToSave = "";
  imageChangedEvent: any = "";
  statusOpenImageDialog = false;
  imageSetForUpdateChanged = false;
  statusFormUpdating: boolean = false;
  activeFormNo = 1;
  statusImageUpload: boolean = false;
  fileSize;
  imageFormatArray: string[] = Object.values(AppConstants.imageFileFormats);
  fileValidStatus: boolean = false;
  prevoiusAdvertuserUrl: string;
  id: number = 0;
  //date
  SpeciedInputField: boolean = true;

  updateButton: boolean = false;
  //html data
  testimonialsObjFG: FormGroup;
  testimonialsObj: Testimonials = new Testimonials();

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
    private testimonialsService: TestimonialsService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idtestimonials === 0) {
        this.id = params.idtestimonials;
        this.testimonialsObj.idtestimonials = this.id;
        // this.eventObj.idtestimonials = this.id;
      } else if (params.idtestimonials > 0) {
        this.id = params.idtestimonials;
        this.testimonialsObj.idtestimonials = this.id;
        //this.eventObj.idtestimonials = this.id;
        this.getTestimonialsByid(this.id);
      }
    });
  }

  ngOnInit() {
    this.formObj1FormValidate();
  }
  formObj1FormValidate() {
    this.testimonialsObjFG = this.formBuilder.group({
      name: new FormControl(this.testimonialsObj.name, [
        Validators.compose([
          Validators.required,

          Validators.maxLength(50)
          //  Validators.pattern(AppConstants.aplhaNumberic)
        ])
      ]),

      position: new FormControl(this.testimonialsObj.text, [
        Validators.compose([Validators.required, Validators.maxLength(500)])
      ]),
      text: new FormControl(this.testimonialsObj.text, [
        Validators.compose([Validators.required, Validators.maxLength(1000)])
      ])
    });
  }

  getTestimonialsByid(id) {
    this.testimonialsService.getById(id).subscribe(
      data => {
        this.statusImageUpload = true;
        this.updateButton = true;
        const responseData = data;
        this.testimonialsObj = responseData["data"] as Testimonials;
        this.testimonialsObjFG.patchValue(this.testimonialsObj);
        // this.getGalleryImageById(this.id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        console.log(error);
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(error);
      }
    );
  }

  saveFormEventSubmit() {
    this.authService.markFormGroupTouched(this.testimonialsObjFG);
    // console.log(this.testimonialsObjFG);
    if (this.testimonialsObjFG.valid) {
      this.testimonialsObj = this.testimonialsObjFG.value;
      this.testimonialsObj.idtestimonials = this.id;
      //  console.log("id......" + this.id);

      if (this.id > 0) {
        this.testimonialsService.update(this.testimonialsObj).subscribe(
          data => {
            //  console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            // console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.authService.showSuccessMsgFn(
                "Your Quotes Updated SuccessFully"
              );
              this.testimonialsObj = responseData["data"] as Testimonials;
              this.router.navigate(["/testimonials_list"]);
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
      } else {
        this.testimonialsService.save(this.testimonialsObj).subscribe(
          data => {
            // console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            //  console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              // Show Success Msg
              this.authService.showSuccessMsgFn(
                this.AppMessages.res_msg_status_success
              );
              this.router.navigateByUrl("/testimonials_list");
              // this.testimonialsObj = responseData["data"] as Testimonials;
            } else {
              this.authService.showWarningMsgFn(
                this.AppMessages.res_msg_status_error
              );
            }
            this.spinnerService.hide();
            this.activeFormNo = 2;
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
    this.router.navigate(["/testimonials_list"]);
  }
}
