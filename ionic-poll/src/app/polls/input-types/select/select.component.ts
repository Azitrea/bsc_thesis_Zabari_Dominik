import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestionSetupItem } from 'src/models/poll';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() group: FormGroup;
  @Input() field: IQuestionSetupItem;
  @Input() index: number;

  constructor() { }

  ngOnInit() {}

}
