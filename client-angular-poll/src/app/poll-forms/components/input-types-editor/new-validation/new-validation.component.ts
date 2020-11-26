import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationConfig } from '../../../models/field.model';

@Component({
  selector: 'hold-new-validation',
  templateUrl: './new-validation.component.html',
  styleUrls: ['./new-validation.component.scss']
})
export class NewValidationComponent implements OnInit, OnChanges, OnDestroy {
  @Input() validationTypeList;
  @Input() validatorToEdit: ValidationConfig;
  @Input() index: number;

  @Output() result: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;
  localeChangeArray = [];
  canHaveValueField = false;

  validatorFormGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.validatorFormGroup = this.formBuilder.group({
      validationID: [null],
      typeID: [null, Validators.required],
      message1: ['', Validators.required],
      message2: [''],
      value1: [null],
      value2: [null]
    });

    this.subscription = this.validatorFormGroup.controls.typeID.valueChanges.subscribe(typeID => {
      this.canHaveValueField = this.canHaveValue;
      if (this.canHaveValue) {
        this.msg2Control.setValidators([Validators.required]);
      } else {
        this.msg2Control.setValidators(null);
      }
      this.msg2Control.updateValueAndValidity();
    });
  }

  ngOnInit() {
  }

  get msg2Control() {
    return this.validatorFormGroup.get('message2') as FormControl;
  }

  get canHaveValue() {
    if (!this.validatorFormGroup.controls.typeID.value) {
      return false;
    }
    const found = this.validationTypeList.find(valType => this.validatorFormGroup.controls.typeID.value === valType.valTypeID);
    console.log(found);
    if (found) {
      return found.canHaveValue;
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.validationTypeList) {
      this.localeChangeArray = this.validationTypeList;
    }

    if (changes.validatorToEdit) {
      if (this.validatorToEdit) {
        this.validatorFormGroup.patchValue({
          validationID: this.validatorToEdit.validationID,
          typeID: this.validatorToEdit.typeID,
          message1: this.validatorToEdit.message1,
          message2: this.validatorToEdit.message2,
          value1: this.validatorToEdit.value1,
          value2: this.validatorToEdit.value2,
        });
      } else {
        this.validatorFormGroup.patchValue({
          validationID: null,
          typeID: null,
          message1: '',
          message2: '',
          value1: null,
          value2: null
        });
      }
    }
  }

  save() {
    this.validatorFormGroup.markAllAsTouched();
    if (this.validatorFormGroup.invalid) {
      return;
    }
    const type = this.validationTypeList.find(v => v.valTypeID === this.validatorFormGroup.value.typeID);

    const result = {
      validationID: this.validatorFormGroup.value.validationID,
      typeID: this.validatorFormGroup.value.typeID,
      description: type.valDescription,
      name: type.valName,
      message1: this.validatorFormGroup.value.message1,
      message2: this.validatorFormGroup.value.message2,
      value1: +this.validatorFormGroup.value.value1,
      value2: +this.validatorFormGroup.value.value2,
      active: true
    };

    this.result.emit({ action: 'SAVE', value: result });
  }

  clearForm() {
    this.result.emit({ action: 'CANCEL', value: null });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
