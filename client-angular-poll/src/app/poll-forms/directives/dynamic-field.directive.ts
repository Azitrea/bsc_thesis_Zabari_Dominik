import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckboxMultichoiceComponent } from '../components/input-types/checkbox-multichoice/checkbox-multichoice.component';
import { CheckboxComponent } from '../components/input-types/checkbox/checkbox.component';
import { DateInputDynamicComponent } from '../components/input-types/date-input-dynamic/date-input-dynamic.component';
import { PhotoComponent } from '../components/input-types/photo/photo.component';
import { RadioButtonComponent } from '../components/input-types/radio-button/radio-button.component';
import { SelectComponent } from '../components/input-types/select/select.component';
import { SimpleQuestionComponent } from '../components/input-types/simple-question/simple-question.component';
import { TextareaComponent } from '../components/input-types/textarea/textarea.component';
import { FieldConfig } from '../models/field.model';

const componentMapper = {
  input: SimpleQuestionComponent,
  checkboxmulti: CheckboxMultichoiceComponent,
  checkbox: CheckboxComponent,
  radio: RadioButtonComponent,
  date: DateInputDynamicComponent,
  dropdown: SelectComponent,
  photo: PhotoComponent,
  textarea: TextareaComponent
};
@Directive({
  selector: '[holdDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() group: FormGroup;
  @Input() field: FieldConfig;
  @Input() index: number;

  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(componentMapper[this.field.type]);

    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
    this.componentRef.instance.index = this.index;
  }
}
