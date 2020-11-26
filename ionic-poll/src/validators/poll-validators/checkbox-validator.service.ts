import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CheckboxValidatorService {

  constructor() { }

  minCheckboxSelected(min: number) {
    return (control: AbstractControl) => {
      const selectedCount = Array.isArray(control.value) ?
        control.value.filter(x => (typeof x === 'object' && x !== null) ? x.checked : x) : null;

      if (selectedCount === null) {
        return;
      }

      if (selectedCount.length >= min) {
        return null;
      }
      return { checkboxmin: true };
    };
  }

  maxCheckboxSelected(max: number) {
    return (control: AbstractControl) => {
      const selectedCount = Array.isArray(control.value) ?
        control.value.filter(x => (typeof x === 'object' && x !== null) ? x.checked : x) : null;

      if (selectedCount === null) {
        return;
      }

      if (selectedCount.length <= max) {
        return null;
      }
      return { checkboxmax: true };
    };
  }
}
