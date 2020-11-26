import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestionSetupItem } from 'src/models/poll';

@Component({
  selector: 'app-validation-display',
  templateUrl: './validation-display.component.html',
  styleUrls: ['./validation-display.component.scss'],
})
export class ValidationDisplayComponent implements OnInit {
  @Input() field: IQuestionSetupItem;
  @Input() group: FormGroup;

  constructor() { }

  ngOnInit() {}

}
