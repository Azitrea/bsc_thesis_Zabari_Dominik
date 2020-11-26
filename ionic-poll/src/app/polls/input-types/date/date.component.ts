import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestionSetupItem } from 'src/models/poll';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: IQuestionSetupItem;
  @Input() index: number;

  maxvalue = '2099-12-31'
  minValue = '1901-01-01'

  constructor() { }

  ngOnInit() {}

}
