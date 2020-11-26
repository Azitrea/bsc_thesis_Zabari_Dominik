import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field.model';

@Component({
  selector: 'hold-display-text',
  templateUrl: './display-text.component.html',
  styleUrls: ['./display-text.component.scss']
})
export class DisplayTextComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
