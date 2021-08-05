import { Component, OnInit } from "@angular/core";
import { AppConstants } from "src/app/_helpers/app-constants";
import { GalleryCategory } from "src/app/_models/gallery-category";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GalleryCategoryService } from "src/app/_services/gallery-category.service";
import { SpinnerService } from "src/app/_utils/spinner/spinner.service";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { AppMessagesEn } from "src/app/_helpers/app-messages-en";

@Component({
  selector: "app-gallery-category",
  templateUrl: "./gallery-category.component.html",
  styleUrls: ["./gallery-category.component.css"]
})
export class GalleryCategoryComponent implements OnInit {
  // App Data
  AppConstants: any = AppConstants;
  AppMessages: any;
  PageMessages: any;
  // User Session
  buttonDiasable: boolean = false;

  galleryCategory: GalleryCategory[] = [];
  selectedCategoryId: number;
  //html data
  galleryCategoryObjFG: FormGroup;
  galleryCatagoryObj: GalleryCategory = new GalleryCategory();
  idcategory = 0;
  id: number;
  updateButton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private galleryCategoryService: GalleryCategoryService,
    private spinnerService: SpinnerService,
    private authneticateService: AuthenticationService
  ) {
    this.AppMessages = AppMessagesEn;

    this.route.params.subscribe(params => {
      if (params.idcategory === 0) {
        this.id = params.idcategory;
        this.idcategory = params.idcategory;
      } else if (params.idcategory > 0) {
        this.id = params.idcategory;
        this.idcategory = params.idcategory;
        this.getGalleryCategoryByid(this.id);
      }
    });
  }

  ngOnInit() {
    this.formValidateGalleryCategory();
  }

  formValidateGalleryCategory() {
    this.galleryCategoryObjFG = this.formBuilder.group({
      gallery_category_name: new FormControl(
        this.galleryCatagoryObj.gallery_category_name,
        [Validators.compose([Validators.required])]
      )
    });
  }

  saveFormGallerySubmit() {
    this.authneticateService.markFormGroupTouched(this.galleryCategoryObjFG);
    if (this.galleryCategoryObjFG.valid) {
      this.galleryCatagoryObj = this.galleryCategoryObjFG.value;
      this.galleryCatagoryObj.idcategory = this.id;

      if (this.id > 0) {
        this.galleryCategoryService.update(this.galleryCatagoryObj).subscribe(
          data => {
            const responseData = data;
            // console.log(responseData);
            this.router.navigate(["/gallery_category_list"]);
          },
          error => {
            this.spinnerService.hide();
            this.authneticateService.showErrorMsgCommonFn(error);
          }
        );
      } else {
        this.galleryCategoryService.save(this.galleryCatagoryObj).subscribe(
          data => {
            const responseData = data;
            // console.log(responseData);
            this.router.navigate(["/gallery_category_list"]);
          },
          error => {
            this.spinnerService.hide();
            this.authneticateService.showErrorMsgCommonFn(error);
          }
        );
      }
    }
  }

  onCancelForm() {
    this.router.navigate(["/gallery_category_list"]);
  }

  getGalleryCategoryByid(id) {
    this.updateButton = true;
    this.galleryCategoryService.getById(id).subscribe(
      data => {
        const responseData = data;
        this.galleryCatagoryObj = responseData["data"] as GalleryCategory;
        this.galleryCategoryObjFG.patchValue(this.galleryCatagoryObj);

        //  this.studentObjFG.controls.profile_image.setValue(this.imageToSave);
      },
      error => {
        // console.log(error);
        this.spinnerService.hide();
        this.authneticateService.showErrorMsgCommonFn(error);
      }
    );
  }
}
