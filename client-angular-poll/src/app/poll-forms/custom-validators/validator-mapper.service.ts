import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { CheckboxValidatorService } from './validators/checkbox-validator.service';
import { DateValidatorService } from './validators/date-validator.service';
import { ExtraValidatorService } from './validators/extra-validator.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorMapperService {

  private validatorMap = {
    required: (value) => Validators.required,
    maxlength: (value) => Validators.maxLength(value),
    minlength: (value) => Validators.minLength(value),
    onlynumber: (value) => this.extraValidator.patternValidator(/^[+-]?\d+(\.\d+)?$/, 'onlynumber'),
    phonenumber: (value) => this.extraValidator.phoneNumberValidator(), // not implemented
    onlyletters: (value) => this.extraValidator.patternValidator(/^[a-zA-Z]+$/, 'onlyletters'),
    postalcode: (value) => this.extraValidator.patternValidator(/^([1-7])(\d){3}$/, 'postalcode'),
    onlyinteger: (value) => this.extraValidator.patternValidator(/^[-+]?\d+$/, 'onlyinteger'),
    greater: (value) => this.extraValidator.greater(value),
    lower: (value) => this.extraValidator.lower(value),
    datefrom: (value) => this.dateValidator.dateFromValidator(value),
    dateto: (value) => this.dateValidator.dateToValidator(value),
    datefuture: (value) => this.dateValidator.dateFutureValidator(),
    datepast: (value) => this.dateValidator.datePastValidator(),
    checkboxmin: (value) => this.checkboxValidator.minCheckboxSelected(value),
    checkboxmax: (value) => this.checkboxValidator.maxCheckboxSelected(value),
    email: (value) => this.extraValidator.patternValidator(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/, 'email'),
    requiredtrue: (value) => this.extraValidator.requiredTrue(),
  };

  constructor(
    private checkboxValidator: CheckboxValidatorService,
    private dateValidator: DateValidatorService,
    private extraValidator: ExtraValidatorService
    ) { }

  getValidator(name, value) {
    return this.validatorMap[name](value);
  }
}
