import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field.model';

@Component({
  selector: 'hold-checkbox-multichoice',
  templateUrl: './checkbox-multichoice.component.html',
  styleUrls: ['./checkbox-multichoice.component.scss']
})
export class CheckboxMultichoiceComponent implements OnInit, OnDestroy {
  @Input() group: FormGroup;
  @Input() field: FieldConfig;
  @Input() index: number;

  constructor() { }

  ngOnInit() { }

  get formArray() {
    return this.group.controls[this.field.name] as FormArray;
  }

  ngOnDestroy(): void {
  }
}
