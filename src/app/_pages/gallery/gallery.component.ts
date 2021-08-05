import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SnotifyService } from "ng-snotify";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup
} from "@angular/forms";
import { AppConstants } from "src/app/_helpers/app-constants";
import { Gallery } from "src/app/_models/gallery.model";
import { GalleryService } from "src/app/_services/gallery.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";
import { GalleryCategory } from "src/app/_models/gallery-category";
import { image_type } from "src/app/_models/models-enum";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit {
  image_type = 'image';
  AppConstants: any = AppConstants;
  AppMessages: any;
  imageToSave = "";
  imageToSave2 = "";
  imageChangedEvent: any = "";
  imageChangedEvent2: any = "";
  statusOpenImageDialog = false;
  imageSetForUpdateChanged = false;
  statusFormUpdating: boolean = false;
  activeFormNo = 1;

  fileSize;
  imageFormatArray: string[] = Object.values(AppConstants.imageFileFormats);
  fileValidStatus: boolean = false;
  prevoiusAdvertuserUrl: string;
  idcategory = 0;
  id: number;
  idGallery: number;
  //date
  SpeciedInputField: boolean = true;

  updateButton: boolean = false;
  galleryImagetype: boolean = false;
  //html data
  galleryObjFG: FormGroup;
  galleryObj: Gallery = new Gallery();

  galleryCategory: GalleryCategory[] = [];
  statusImageUpload: boolean = false;
  @ViewChild('videoPlayer') videoplayer: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snotifyService: SnotifyService,
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private formBuilder: FormBuilder,
    private galleryService: GalleryService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.category === 0) {
        this.id = params.category;
        this.idcategory = params.category;
      } else if (params.category > 0) {
        this.id = params.category;
        //console.log("update2222kkkkkkkkkkkk");
        this.idcategory = params.category;
        // this.getGalleryByid(this.id);
      }
    });

    // this.route.params.subscribe(params => {
    //   if (params.idgallery === 0) {
    //     this.idGallery = params.idgallery;
    //   } else if (params.idgallery > 0) {
    //     this.idGallery = params.idgallery;
    //     console.log("update2222");
    //     //this.updateButton = true;
    //     this.getGalleryByid(this.idGallery);
    //   }
    // });
    this.galleryObj.image_type = image_type.Image;
  }

  ngOnInit() {
    this.formObj1FormValidate();
    //this.getGalleryCategoryList();
  }

  clickRadio(value) {
    // console.log(value);
    let image_type = this.galleryObjFG.controls.image_type.value;
    //console.log(value);
    if (value == "image") {
      this.galleryImagetype = false;
    } else {
      this.galleryImagetype = true;
    }
  }

  toggleVideo(event: any) {
    this.videoplayer.play();
  }




  formObj1FormValidate() {
    this.galleryObjFG = this.formBuilder.group({
      title: new FormControl(this.galleryObj.title, [
        //  Validators.compose([Validators.required, Validators.maxLength(50)])
      ]),
      video_url: new FormControl(this.galleryObj.video_url, [
        Validators.compose([Validators.maxLength(500)])
      ]),
      image_type: this.galleryObj.image_type
    });
  }

  getGalleryByid(id) {
    this.updateButton = true;
    this.galleryService.getById(id).subscribe(
      data => {
        this.statusImageUpload = true;
        const responseData = data;
        console.log("update");
        console.log(responseData);
        this.galleryObj = responseData["data"] as Gallery;
        this.galleryObjFG.patchValue(this.galleryObj);
        //this.getGalleryImageById(this.id);
        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        // console.log(error);
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(error);
      }
    );
  }

  saveFormEventSubmit() {
    this.authService.markFormGroupTouched(this.galleryObjFG);
    // console.log(this.galleryObjFG);
    if (this.galleryObjFG.valid) {
      // console.log(this.galleryObjFG.value)
      this.galleryObj = this.galleryObjFG.value;
      this.galleryObj.category = this.id;
      // console.log(".....................");
      // console.log(this.galleryObj);
      // console.log("id......" + JSON.stringify(this.galleryObj));
      this.galleryService.saveOrUpdate(this.galleryObj).subscribe(
        data => {
          // console.log("data sendi request body" + JSON.stringify(data));
          const responseData = data;
          // console.log("data" + JSON.stringify(responseData));

          if (
            responseData["status_code"] ===
            AppConstants.RESPONSE_STATUS_CODE_SUCCESS
          ) {
            // Show Success Msg
            // this.authService.showSuccessMsgFn(
            //   this.AppMessages.res_msg_status_success
            // );
            this.galleryObj = responseData["data"] as Gallery;
            // console.log(this.galleryObj);
            this.id = this.galleryObj.idgallery;
            // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$");
            //  console.log(this.id);
          } else {
            this.authService.showWarningMsgFn(
              this.AppMessages.res_msg_status_error
            );
          }
          this.spinnerService.hide();
          if (this.galleryObjFG.value.image_type == 'image') {
            this.activeFormNo = 2;
          }
          else {
            this.router.navigateByUrl("/gallery_list");
          }
        },
        err => {
          this.spinnerService.hide();
          this.authService.showErrorMsgCommonFn(err);
        }
      );
    }
  }
  updateImage() {
    if (this.imageSetForUpdateChanged === true) {
      if (
        this.fileSize > 0 &&
        this.imageSetForUpdateChanged === true &&
        this.fileSize <= 3
      ) {
        this.statusOpenImageDialog = false;
        this.imageChangedEvent = "";
        (<HTMLInputElement>document.getElementById("selectImage")).value = "";
        // this.studentObj.profile_image = this.imageToSave;
        // console.log("step4 ---");
        this.imageUploadAndUpdate();
      } else {
        // console.log("image file size greater than 3 mb ");
        this.authService.showWarningMsgFn("image file size greater than 3 mb ");
      }
    } else {
      // console.log("Error in updating image ");
    }
  }
  previousImg;
  showImageDialog() {
    this.statusOpenImageDialog = true;
    this.imageChangedEvent = "";
    this.imageChangedEvent2 = "";
    // this.imageToSave = "";
    this.imageSetForUpdateChanged = false;
    this.previousImg = this.imageToSave;
    // this.previousImg = this.studentObj.profile_image;
    // console.log("step1--------" + "Open Dialog");
  }

  hideImageDialog() {
    this.statusOpenImageDialog = false;
    this.imageChangedEvent = "event";
    this.imageToSave = "";
    this.imageToSave = this.previousImg;
    this.imageSetForUpdateChanged = false;
    (<HTMLInputElement>document.getElementById("selectImage")).value = "";
  }

  imageCropped(image: string) {
    // console.log(image);
    var base64str = image.substr(22);
    var decoded = atob(base64str);
    var fileSizeMb;
    var fileSizeKb;
    fileSizeMb = decoded.length / 1000000;
    fileSizeKb = decoded.length / 1000;
    this.fileSize = fileSizeMb;
    this.imageToSave = image;
    this.imageSetForUpdateChanged = true;
    if (this.statusFormUpdating === true) {
      document
        .getElementById("studentImage")
        .setAttribute("src", this.imageToSave);
      document
        .getElementById("studentImage2")
        .setAttribute("src", this.imageToSave);
    }
    //  console.log("step3--------" + "image Cropped");
  }
  imageCropped2(image: string) {
    var base64str = image.substr(22);
    var decoded = atob(base64str);
    var fileSizeMb;
    var fileSizeKb;
    fileSizeMb = decoded.length / 1000000;
    fileSizeKb = decoded.length / 1000;
    this.fileSize = fileSizeMb;
    this.imageToSave2 = image;

    console.log("step3 thumb--------" + "image Cropped");
  }
  fileChangeEvent(event: any): void {
    var filetype = event.srcElement.files[0].type;
    let imageType = filetype.split("/")[1];
    if (this.imageFormatArray.indexOf(imageType) > -1) {
      this.fileValidStatus = false;
      this.imageChangedEvent = event;
      this.imageChangedEvent2 = event;
    } else {
      this.fileValidStatus = true;
      this.imageToSave = "";
      this.imageChangedEvent = "";
    }
    // console.log(
    // "step2--------" + this.imageChangedEvent + "---File Change Event"
    // );
  }
  imageUploadAndUpdate() {
    this.authService.markFormGroupTouched(this.galleryObjFG);
    this.spinnerService.show();
    // if (this.statusImageUpload == true) {
    //   this.studentObj.profile_image = this.imageToSave;
    //   // Spinner Show
    // } else {
    //   this.studentObj.profile_image = "";
    // }
    //console.log(this.galleryObj.gallery_image + "+++++++++++++++ step5");
    this.galleryObj.gallery_image = this.imageToSave;
    this.galleryObj.gallery_image_small = this.imageToSave;

    this.galleryService.imageUpload(this.galleryObj).subscribe(
      data => {
        const responseData = data as any;
        // console.log(this.galleryObj.gallery_image + "+++++++++++++++ step55");
        if (
          responseData["status_code"] ===
          AppConstants.RESPONSE_STATUS_CODE_SUCCESS
        ) {
          this.galleryObj = responseData["data"];

          // this.statusImageUpload = true;
          this.imageToSave = "";
          this.imageSetForUpdateChanged = false;
          //   this.getGalleryImageById(this.id);
          this.spinnerService.hide();
          // Show Success Msg
          this.authService.showSuccessMsgFn("Image uploaded SuccessFully");
          //   this.router.navigateByUrl("/gallery_list");
          // this.router.navigateByUrl("/gallery_overview_details");
          this.router.navigate(["/gallery_overview_details", this.idcategory]);
          // console.log(
          // this.galleryObj.gallery_image + "+++++++++++++++ step55f"
          // );
        } else {
          this.authService.showWarningMsgFn(
            this.AppMessages.res_msg_status_error
          );
        }
      },
      err => {
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  getGalleryImageById(id) {
    this.spinnerService.show();

    this.galleryService.getGalleryImageById(id).subscribe(
      data => {
        const responseData = data as any;
        this.imageToSave = "data:image/png;base64," + responseData["data"];
        this.spinnerService.hide();
      },
      err => {
        // Spinner Hide
        this.spinnerService.hide();
        this.authService.showErrorMsgCommonFn(err);
      }
    );
  }

  submitButton() {
    this.router.navigate(["/gallery_list"]);
    //this.router.navigate(["/gallery_list"]);
    // this.authService.showSuccessMsgFn(
    //   "Your Application Submitted SuccessFully"
    // );
  }

  getGalleryCategoryList() {
    this.galleryService.getGalleryCategoryList().subscribe(
      data => {
        const responseData = data;
        console.log(responseData);
        this.galleryCategory = responseData["data"] as GalleryCategory[];
      },
      error => {
        console.log(error);
      }
    );
  }
  onCancelForm() {
    this.router.navigateByUrl("/gallery_list");
  }
}
