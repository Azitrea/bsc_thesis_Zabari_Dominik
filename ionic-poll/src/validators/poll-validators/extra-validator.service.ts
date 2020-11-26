import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ExtraValidatorService {

  constructor() { }

  phoneNumberValidator() {
    return (control: AbstractControl) => {
      return null;
    };
  }

  patternValidator(pattern, error) {
    return (control: AbstractControl) => {
      if (control.value === '' || control.value === null) {
        return null;
      }
      const reg = new RegExp(pattern);
      if (reg.test(control.value)) {
        return null;
      }
      return { [error]: true };
    };
  }

  requiredTrue() {
    return (control: AbstractControl) => {
      if (control.value === true) {
        return null;
      }
      return { requiredtrue: true };
    };
  }

  greater(inputValue) {
    return (control: AbstractControl) => {
      if (control.value === '' || control.value === null) {
        return null;
      }
      if (+control.value >= inputValue) {
        return null;
      }
      return { greater: true };
    };
  }

  lower(inputValue) {
    return (control: AbstractControl) => {
      if (control.value === '' || control.value === null) {
        return null;
      }
      if (+control.value <= inputValue) {
        return null;
      }
      return { lower: true };
    };
  }
}
