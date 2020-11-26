import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckboxMultiComponent } from 'src/app/polls/input-types/checkbox-multi/checkbox-multi.component';
import { CheckboxComponent } from 'src/app/polls/input-types/checkbox/checkbox.component';
import { DateComponent } from 'src/app/polls/input-types/date/date.component';
import { InputComponent } from 'src/app/polls/input-types/input/input.component';
import { PhotoComponent } from 'src/app/polls/input-types/photo/photo.component';
import { RadioComponent } from 'src/app/polls/input-types/radio/radio.component';
import { SelectComponent } from 'src/app/polls/input-types/select/select.component';
import { TextareaComponent } from 'src/app/polls/input-types/textarea/textarea.component';
import { IQuestionSetupItem } from 'src/models/poll';

const componentMapper = {
  input: InputComponent,
  checkboxmulti: CheckboxMultiComponent,
  checkbox: CheckboxComponent,
  radio: RadioComponent,
  date: DateComponent,
  dropdown: SelectComponent,
  photo: PhotoComponent,
  textarea: TextareaComponent
};

@Directive({
  selector: '[appDynamicForm]'
})
export class DynamicFormDirective implements OnInit {
  @Input() group: FormGroup;
  @Input() field: IQuestionSetupItem;
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
