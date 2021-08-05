import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { SpinnerService } from 'src/app/_utils/spinner/spinner.service';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AppMessagesEn } from 'src/app/_helpers/app-messages-en';
import { AppConstants } from 'src/app/_helpers/app-constants';
import { Gallery } from 'src/app/_models/gallery.model';
import { GalleryService } from 'src/app/_services/gallery.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-gallery-overview-update',
  templateUrl: './gallery-overview-update.component.html',
  styleUrls: ['./gallery-overview-update.component.css']
})
export class GalleryOverviewUpdateComponent implements OnInit {
  AppConstants: any = AppConstants;
  AppMessages: any;
  galleryTitleObjFG: FormGroup;
  id: number = 0;
  updateButton: boolean = false;
  statusImageUpload: boolean = false;
  galleryUpdateObj: Gallery = new Gallery();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private location: Location,
    private galleryService: GalleryService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idgallery === 0) {
        this.id = params.idgallery;
        this.galleryUpdateObj.idgallery = this.id;
        // this.eventObj.idtestimonials = this.id;
      } else if (params.idgallery > 0) {
        this.id = params.idgallery;
        this.galleryUpdateObj.idgallery = this.id;
        //this.eventObj.idtestimonials = this.id;
        this.getGalleryUpdateByid(this.id);
      }
    });
  }

  ngOnInit() {
    this.formObj1FormValidate();
  }
  formObj1FormValidate() {
    this.galleryTitleObjFG = this.formBuilder.group({
      title: new FormControl(this.galleryUpdateObj.title, [
        Validators.compose([
          Validators.required,

          Validators.maxLength(50)
          //  Validators.pattern(AppConstants.aplhaNumberic)
        ])
      ]),

    });
  }

  getGalleryUpdateByid(id) {
    this.galleryService.getById(id).subscribe(
      data => {
        this.updateButton = true;
        this.statusImageUpload = true;
        const responseData = data;
        console.log(responseData);
        this.galleryUpdateObj = responseData["data"] as Gallery;
        this.galleryTitleObjFG.patchValue(this.galleryUpdateObj);
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
    this.authService.markFormGroupTouched(this.galleryTitleObjFG);
    // console.log(this.galleryUpdateObjFG);
    if (this.galleryTitleObjFG.valid) {
      this.galleryUpdateObj = this.galleryTitleObjFG.value;
      this.galleryUpdateObj.idgallery = this.id;
      //  console.log("id......" + this.id);

      if (this.id > 0) {
        this.galleryService.saveOrUpdate(this.galleryUpdateObj).subscribe(
          data => {
            //  console.log("data sendi request body" + JSON.stringify(data));
            const responseData = data;
            // console.log("data" + JSON.stringify(responseData));

            if (
              responseData["status_code"] ===
              AppConstants.RESPONSE_STATUS_CODE_SUCCESS
            ) {
              this.authService.showSuccessMsgFn(
                "Your Gallery Title Updated SuccessFully"
              );
              this.galleryUpdateObj = responseData["data"] as Gallery;
              this.location.back();
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
    this.location.back();
  }
}
