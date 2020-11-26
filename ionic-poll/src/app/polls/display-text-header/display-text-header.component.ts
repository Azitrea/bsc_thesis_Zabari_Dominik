import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IQuestionSetupItem } from 'src/models/poll';

@Component({
  selector: 'app-display-text-header',
  templateUrl: './display-text-header.component.html',
  styleUrls: ['./display-text-header.component.scss'],
})
export class DisplayTextHeaderComponent implements OnInit {
  @Input() index;
  @Input() field: IQuestionSetupItem;
  @Input() group: FormGroup;

  constructor() { }

  ngOnInit() {}

}
