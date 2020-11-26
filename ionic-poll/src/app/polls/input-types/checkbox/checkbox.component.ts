import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestionSetupItem } from 'src/models/poll';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: IQuestionSetupItem;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }


}
