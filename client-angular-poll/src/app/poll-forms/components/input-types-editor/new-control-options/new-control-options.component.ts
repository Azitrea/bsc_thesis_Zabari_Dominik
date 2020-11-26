import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hold-new-control-options',
  templateUrl: './new-control-options.component.html',
  styleUrls: ['./new-control-options.component.scss']
})
export class NewControlOptionsComponent implements OnInit, OnChanges {
  @Input() option;
  @Input() index;

  @Output() result: EventEmitter<any> = new EventEmitter();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      choiceID: [null],
      choiceString: ['', Validators.required],
      choiceValue: [null],
      active: [true],
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.option) {
      this.formGroup.patchValue({
        choiceID: this.option.choiceID,
        choiceString: this.option.choiceString,
        choiceValue: this.option.choiceValue,
        active: this.option.active,
      });
    }
  }

  save() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }

    const ctrlValue = this.formGroup.value;
    const r = {
      choiceID: ctrlValue.choiceID,
      choiceString: ctrlValue.choiceString,
      choiceValue: ctrlValue.choiceValue,
      active: ctrlValue.active,
    };

    this.result.emit({ action: 'SAVE', value: r });
  }

  clearForm() {
    this.result.emit({ action: 'CANCEL', value: null });
  }

}
