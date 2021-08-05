import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessagesService } from './validation-messages.service';
import { AppConstants } from '../../_helpers/app-constants';

@Component({
  selector: 'custom-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.css']
})
export class ValidationMessagesComponent implements OnInit {

  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

  errorMessage() {

    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationMessagesService.getValidatorErrorMessage(1, propertyName, this.control.errors[propertyName]);
      } else if (this.control.errors) {
        // return ValidationMessagesService.getValidatorErrorMessage(this.langPreference, propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}

