import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field.model';

@Component({
  selector: 'hold-simple-question',
  templateUrl: './simple-question.component.html',
  styleUrls: ['./simple-question.component.scss']
})
export class SimpleQuestionComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: FieldConfig;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
