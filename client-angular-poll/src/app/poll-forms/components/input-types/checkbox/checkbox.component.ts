import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field.model';

@Component({
  selector: 'hold-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: FieldConfig;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
