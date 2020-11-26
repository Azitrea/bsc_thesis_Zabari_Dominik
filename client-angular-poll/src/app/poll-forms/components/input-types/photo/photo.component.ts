import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field.model';

@Component({
  selector: 'hold-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: FieldConfig;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

  get formArray() {
    return this.group.controls[this.field.name] as FormArray;
  }

}
