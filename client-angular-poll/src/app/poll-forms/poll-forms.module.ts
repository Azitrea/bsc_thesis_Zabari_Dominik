import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { Routing } from './poll-forms.routing';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { NewFormComponent } from './components/new-form/new-form.component';
import { NewFormModalBaseComponent } from './components/new-form-modal-base/new-form-modal-base.component';
import { CheckboxMultichoiceComponent } from './components/input-types/checkbox-multichoice/checkbox-multichoice.component';
import { CheckboxComponent } from './components/input-types/checkbox/checkbox.component';
import { DateInputDynamicComponent } from './components/input-types/date-input-dynamic/date-input-dynamic.component';
import { PhotoComponent } from './components/input-types/photo/photo.component';
import { RadioButtonComponent } from './components/input-types/radio-button/radio-button.component';
import { SelectComponent } from './components/input-types/select/select.component';
import { SimpleQuestionComponent } from './components/input-types/simple-question/simple-question.component';
import { TextareaComponent } from './components/input-types/textarea/textarea.component';
import { NewControlOptionsComponent } from './components/input-types-editor/new-control-options/new-control-options.component';
import { ControlOptionsComponent } from './components/input-types-editor/control-options/control-options.component';
import { NewValidationComponent } from './components/input-types-editor/new-validation/new-validation.component';
import { ValidatorEditorComponent } from './components/input-types-editor/validator-editor/validator-editor.component';
import { DisplayValidationsComponent } from './components/display-validations/display-validations.component';
import { DisplayTextComponent } from './components/display-text/display-text.component';
import { InstanceListComponent } from './components/instance-list/instance-list.component';
import { PollAnswerViewComponent } from './components/poll-answer-view/poll-answer-view.component';
import { SecureImagePipe } from './pipes/secure-image.pipe';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    FormListComponent,
    FormBuilderComponent,
    DynamicFormComponent,
    SimpleQuestionComponent,
    DynamicFieldDirective,
    FormWrapperComponent,
    NewFormComponent,
    NewFormModalBaseComponent,
    SelectComponent,
    CheckboxComponent,
    CheckboxMultichoiceComponent,
    RadioButtonComponent,
    DateInputDynamicComponent,
    PhotoComponent,
    ValidatorEditorComponent,
    TextareaComponent,
    NewValidationComponent,
    ControlOptionsComponent,
    NewControlOptionsComponent,
    DisplayValidationsComponent,
    DisplayTextComponent,
    InstanceListComponent,
    PollAnswerViewComponent,
    SecureImagePipe,
  ],
  imports: [
    CommonModule,
    Routing,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  entryComponents: [
    SimpleQuestionComponent,
    SelectComponent,
    CheckboxComponent,
    CheckboxMultichoiceComponent,
    RadioButtonComponent,
    DateInputDynamicComponent,
    PhotoComponent,
    NewFormComponent,
    TextareaComponent,
  ]
})
export class PollFormsModule { }
