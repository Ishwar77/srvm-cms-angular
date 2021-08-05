import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppMessagesEn } from '../../_helpers/app-messages-en';
import { AppConstants } from '../../_helpers/app-constants';

@Injectable({
  providedIn: 'root'
})
export class ValidationMessagesService {

  userSession: any;
  AppConstants: any = AppConstants;
  AppMessages: any;

  static getValidatorErrorMessage(langPreference: number, validatorName: string, validatorValue?: any) {
    let requiredLengthTemp = validatorValue.requiredLength;
    let requiredMinValueTemp = validatorValue.min;
    let requiredMaxValueTemp = validatorValue.max;
    let config = {};

    config = {
      'required': AppMessagesEn.validation_messages_required,
      'minlength': AppMessagesEn.validation_messages_minlength(requiredLengthTemp),
      'maxlength': AppMessagesEn.validation_messages_maxlength(requiredLengthTemp),
      'min': AppMessagesEn.validation_messages_min(requiredMinValueTemp),
      'max': AppMessagesEn.validation_messages_max(requiredMaxValueTemp),
      'pattern': AppMessagesEn.validation_messages_pattern,
      'email': AppMessagesEn.validation_messages_email,
      'passwordNotMatched': AppMessagesEn.validation_messages_password_not_matched,
      'valuesNotMatched': AppMessagesEn.validation_messages_values_not_matched,
      'dateNotValid': AppMessagesEn.validation_messages_end_date_must_be_greather,
      'uploadDoc': 'Please upload document',
    };

    return config[validatorName];
  }

  static checkPasswordsMatch(passwordInput: string, confirmPasswordInput: string) {
    return (group: FormGroup) => {
      let passwordInputEle = group.controls[passwordInput],
        passwordConfirmationInput = group.controls[confirmPasswordInput];
      if (!passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ required: true })
      } else if (passwordInputEle.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ passwordNotMatched: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  static checkValuesMatch(formControlName1: string, fcNformControlName2: string) {
    return (group: FormGroup) => {
      let inputEle = group.controls[formControlName1],
        confirmationInput = group.controls[fcNformControlName2];

      if (!confirmationInput.value) {
        return confirmationInput.setErrors({ required: true })
      } else if (inputEle.value !== confirmationInput.value) {
        return confirmationInput.setErrors({ valuesNotMatched: true })
      }
      else {
        return confirmationInput.setErrors(null);
      }
    }
  }

  static checkPanValuesMatch(formControlName1: string, fcNformControlName2: string) {
    return (group: FormGroup) => {
      let inputEle = group.controls[formControlName1],
        confirmationInput = group.controls[fcNformControlName2];

      if (!confirmationInput.value) {
        return confirmationInput.setErrors({ required: true })
      } else if (inputEle.value.toUpperCase() !== confirmationInput.value.toUpperCase()) {
        return confirmationInput.setErrors({ valuesNotMatched: true })
      }
      else {
        return confirmationInput.setErrors(null);
      }
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    let regexExp = '';
    // '/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/';
    if (control.value.match(regexExp)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number

    let regexExp = '';
    // /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/ 
    if (control.value.match(regexExp)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static getControlFieldsCount(formGroupTemp: FormGroup) {
    let controlFieldsCountInitTemp = 0;
    for (const field in formGroupTemp.controls) {
      controlFieldsCountInitTemp += 1;
    }
    return controlFieldsCountInitTemp;
  }

  static startdateLessThanEndDate(startDate: string, endDate: string) {
    return (group: FormGroup) => {
      let sDate = group.controls[startDate],
        eDate = group.controls[endDate];

      if (sDate.value > eDate.value) {
        return eDate.setErrors({ dateNotValid: true })
      } else {
        return eDate.setErrors({ dateNotValid: false })
      }
    }
  }
}

