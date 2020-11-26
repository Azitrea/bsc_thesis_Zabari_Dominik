import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field.model';

@Component({
  selector: 'hold-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: FieldConfig;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
