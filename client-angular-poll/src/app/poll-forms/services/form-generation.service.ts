import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorMapperService } from '../custom-validators/validator-mapper.service';
import { ChoiceOptions } from '../models/field.model';
import { InputType } from '../models/input-type.model';

@Injectable({
  providedIn: 'root'
})
export class FormGenerationService {

  constructor(private fb: FormBuilder, private validatorMapperService: ValidatorMapperService) { }

  createControl(fields) {
    const group = this.fb.group({});
    fields.forEach(field => {
      this.addNewFormControl(group, field);
    });
    return group;
  }

  addNewFormControl(group, field) {
    switch (field.type) {
      case InputType.CHECKBOX_MULTI: {
        const control = this.fb.array(
          [...field.options.map((x: ChoiceOptions) => {
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
      }
    }
  }

  bindValidations(validations: any) {
    if (validations.length > 0) {
      const validList = [];
      validations.forEach(valid => {
        validList.push(this.validatorMapperService.getValidator(valid.name, valid.value1));
      });
      return validList;
    }
    return null;
  }

}
