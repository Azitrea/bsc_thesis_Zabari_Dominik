import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field.model';

@Component({
  selector: 'hold-date-input-dynamic',
  templateUrl: './date-input-dynamic.component.html',
  styleUrls: ['./date-input-dynamic.component.scss']
})
export class DateInputDynamicComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: FieldConfig;
  @Input() index: number;

  minDate: string;
  maxDate: string;

  constructor() { }

  ngOnInit() {
  }

}
