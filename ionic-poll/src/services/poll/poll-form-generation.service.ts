import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { IQuestionSetupItem, InputType, IQuestionSetupChoiceItem } from 'src/models/poll';
import { ValidatorMapperService } from 'src/validators/poll-validators/validator-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class PollFormGenerationService {
  private selectedForm: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private fb: FormBuilder, private validatorMapperService: ValidatorMapperService) { }

  setSelectedForm(pollID: number) {
    this.selectedForm.next(pollID);
  }

  getSelectedForm() {
    return this.selectedForm;
  }

  createControl(fields) {
    const group = this.fb.group({});
    fields.forEach(field => {
      this.addNewFormControl(group, field);
    });
    return group;
  }

  addNewFormControl(group: FormGroup, field: IQuestionSetupItem) {
    switch (field.type) {
      case InputType.CHECKBOX: {
        const control = this.fb.control(
          false,
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
        break;
      }
      case InputType.CHECKBOX_MULTI: {
        const control = this.fb.array(
          [...field.options.map((x: IQuestionSetupChoiceItem) => {
            return new FormGroup({
              choiceID: new FormControl(x.choiceID),
              choiceString: new FormControl(x.choiceString),
              choiceValue: new FormControl(x.choiceValue),
              active: new FormControl(x.active),
              checked: new FormControl(false)
            });
          })],
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
        break;
      }
      case InputType.PHOTO: {
        const control = this.fb.array(
          [],
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
        break;
      }
      default: {
        const control = this.fb.control(
          '',
          this.bindValidations(field.validations || [])
        );
        group.addControl(field.name, control);
        break;
      }
    }
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(this.validatorMapperService.getValidator(valid.name, valid.message2));
      });
      return validList;
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }
}
