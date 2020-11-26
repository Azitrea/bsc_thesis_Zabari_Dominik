import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChoiceOptions } from '../../../models/field.model';

@Component({
  selector: 'hold-control-options',
  templateUrl: './control-options.component.html',
  styleUrls: ['./control-options.component.scss']
})
export class ControlOptionsComponent implements OnInit, OnChanges {
  @Input() options: ChoiceOptions[];

  toEdit = null;
  index = null;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.clearForm();
    }
  }

  get optionTrueLength() {
    return this.options.filter(opt => opt.active).length;
  }

  removeOption(index) {
    if (this.index === index) {
      this.toEdit = null;
      this.index = null;
    }
    this.options[index].active = false;
  }

  select(item, i) {
    this.toEdit = item;
    this.index = i;
  }

  addNewControl() {
    this.toEdit = {
      choiceID: null,
      choiceString: '',
      choiceValue: null,
      active: true,
    };
    this.index = null;
  }

  addEditControl(event) {
    switch (event.action) {
      case 'CANCEL': {
        this.clearForm();
        break;
      }
      case 'SAVE': {
        this.save(event.value);
        break;
      }
    }
  }

  save(result) {
    if (this.index !== null) {
      this.options.splice(this.index, 1, result);
    } else {
      this.options.push(result);
    }
    this.clearForm();
  }

  clearForm() {
    this.toEdit = null;
    this.index = null;
  }

}
