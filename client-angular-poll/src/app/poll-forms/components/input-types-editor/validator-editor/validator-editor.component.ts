import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ValidationConfig } from '../../../models/field.model';

@Component({
  selector: 'hold-validator-editor',
  templateUrl: './validator-editor.component.html',
  styleUrls: ['./validator-editor.component.scss']
})
export class ValidatorEditorComponent implements OnInit, OnChanges {
  @Input() validations: ValidationConfig[];
  @Input() validationTypeList;

  errorMsg = null;

  validatorToEdit: ValidationConfig = null;
  editMode = false;
  index: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.validations || changes.validationTypeList) {
      this.clearForm();
    }
  }

  createNew() {
    this.editMode = true;
    this.index = null;
    this.validatorToEdit = null;
  }

  editValidator(validator: ValidationConfig, index: number) {
    this.validatorToEdit = validator;
    this.index = index;
    this.editMode = true;
  }

  handleResult(event) {
    switch (event.action) {
      case 'CANCEL': {
        this.clearForm();
        break;
      }
      case 'SAVE': {
        this.save(event.value);
        break;
      }
    }
  }

  save(result) {
    const alreadyIn = this.validations.find(v => result.typeID === v.typeID);
    if (alreadyIn && alreadyIn.active && this.index === null) {
      console.log('Már létezik a validáció');
      this.errorMsg = 'Már létezik a validáció';
      return;
    }
    if (this.index !== null) {
      this.validations.splice(this.index, 1, result);
    } else {
      this.validations.push(result);
    }
    this.clearForm();
  }

  clearForm() {
    this.validatorToEdit = null;
    this.index = null;
    this.editMode = false;
    this.errorMsg = null;
  }

  deleteValidator(validation, index) {
    if (this.index === index) {
      this.clearForm();
    }
    validation.active = false;
  }

}
