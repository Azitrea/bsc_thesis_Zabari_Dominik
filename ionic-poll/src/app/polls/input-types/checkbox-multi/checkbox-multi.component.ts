import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IQuestionSetupItem } from 'src/models/poll';

@Component({
  selector: 'app-checkbox-multi',
  templateUrl: './checkbox-multi.component.html',
  styleUrls: ['./checkbox-multi.component.scss'],
})
export class CheckboxMultiComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: IQuestionSetupItem;
  @Input() index: number;

  constructor() { }

  ngOnInit() { }

  get formArray() {
    return this.group.controls[this.field.name] as FormArray;
  }

  ngOnDestroy(): void {
  }

}
