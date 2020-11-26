import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field.model';

@Component({
  selector: 'hold-display-validations',
  templateUrl: './display-validations.component.html',
  styleUrls: ['./display-validations.component.scss']
})
export class DisplayValidationsComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
