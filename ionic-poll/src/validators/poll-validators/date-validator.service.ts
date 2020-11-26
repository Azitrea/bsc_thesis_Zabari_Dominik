import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateValidatorService {

  constructor() { }

  dateFromValidator(minDate: string) {
    const minDateInput = new Date(new Date(minDate).toLocaleDateString());

    return (control: AbstractControl) => {
      if (control.value === '' || control.value === null) {
        return null;
      }

      const date = new Date(new Date(control.value).toLocaleDateString());
      if (date.toString() === 'Invalid Date') {
        return { datefrom: true };
      }

      if (date.getTime() < minDateInput.getTime()) {
        return { datefrom: true };
      }
      return null;
    };
  }

  dateToValidator(maxDate: string) {
    const maxDateInput = new Date(new Date(maxDate).toLocaleDateString());

    return (control: AbstractControl) => {
      if (control.value === '' || control.value === null) {
        return null;
      }
      const date = new Date(new Date(control.value).toLocaleDateString());
      if (date.toString() === 'Invalid Date') {
        return { dateto: true };
      }

      if (date.getTime() > maxDateInput.getTime()) {
        return { dateto: true };
      }
      return null;
    };
  }

  dateFutureValidator() {
    const today = new Date(new Date().toLocaleDateString());
    return (control: AbstractControl) => {
      if (control.value === '' || control.value === null) {
        return null;
      }

      const date = new Date(new Date(control.value).toLocaleDateString());
      if (date.toString() === 'Invalid Date') {
        return { datefuture: true };
      }

      if (date.getTime() < today.getTime()) {
        return { datefuture: true };
      }
      return null;
    };
  }

  datePastValidator() {
    const today = new Date(new Date().toLocaleDateString());

    return (control: AbstractControl) => {
      if (control.value === '' || control.value === null) {
        return null;
      }

      const date = new Date(new Date(control.value).toLocaleDateString());
      if (date.toString() === 'Invalid Date') {
        return { datepast: true };
      }

      if (date.getTime() > today.getTime()) {
        return { datepast: true };
      }
      return null;
    };
  }
}
