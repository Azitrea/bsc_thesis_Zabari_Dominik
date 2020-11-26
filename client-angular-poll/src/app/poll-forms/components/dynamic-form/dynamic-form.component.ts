import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FieldConfig } from '../../models/field.model';
import { FormGenerationService } from '../../services/form-generation.service';
import { FormUpdateService } from '../../services/form-update.service';

@Component({
  selector: 'hold-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() fields: FieldConfig[] = [];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  selectedIndex: number;

  private subscription: Subscription = new Subscription();

  constructor(
    private formUpdateSevice: FormUpdateService,
    private formGenerationService: FormGenerationService,
  ) { }

  ngOnInit(): void {
    this.form = this.formGenerationService.createControl(this.fields);

    this.subscription.add(this.formUpdateSevice.getFormUpdateEvent().subscribe(ctrl => {
      const index = ctrl.index;
      const newField = ctrl.field;
      const deleteField = ctrl.deleteField;

      if (deleteField) {
        this.fields.splice(index, 1);
        this.resetForm();
        return;
      }

      if (index !== null) {
        this.fields.splice(index, 1, newField);
      } else {
        this.fields.push(newField);
      }

      this.resetForm();
    }));

    this.subscription.add(this.formUpdateSevice.getFieldToEdit().subscribe(field => {
      this.selectedIndex = field.index;
    }));

  }

  resetForm() {
    this.formUpdateSevice.setFieldToEdit(null, null);
    this.form = null;
    this.form = this.formGenerationService.createControl(this.fields);
    this.form.disable();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fields && !changes.fields.isFirstChange()) {
      console.log('Generating new form...');
      this.form = null;
      this.form = this.formGenerationService.createControl(this.fields);
      this.form.disable();
    }
  }

  editField(field, index) {
    this.formUpdateSevice.setFieldToEdit(field, index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
