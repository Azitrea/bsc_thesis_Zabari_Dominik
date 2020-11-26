import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { PollFormMutationService } from 'src/services/poll/poll-form-mutation.service';
import { FieldConfig } from '../models/field.model';

@Injectable({
  providedIn: 'root'
})
export class FormUpdateService {
  private selectedForm: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private selectedAnswer: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private formUpdateEvent: Subject<any> = new Subject();
  private fieldToEdit: Subject<any> = new Subject();

  constructor(private formMutatuinService: PollFormMutationService) { }

  setFieldToEdit(field: FieldConfig, index: number) {
    this.fieldToEdit.next({field, index});
  }

  getFieldToEdit() {
    return this.fieldToEdit;
  }

  setFormUpdateEvent(field: FieldConfig, index: number, deleteField = false) {
    this.formUpdateEvent.next({field, index, deleteField});
  }

  getFormUpdateEvent() {
    return this.formUpdateEvent;
  }

  setSelectedForm(pollID: number) {
    this.selectedForm.next(pollID);
  }

  getSelectedForm() {
    return this.selectedForm;
  }

  setSelectedAnswer(pollID, pollInstanceID) {
    this.selectedAnswer.next({pollID, pollInstanceID});
  }

  getSelectedAnswer() {
    return this.selectedAnswer;
  }

  updateAndSavePoll(pollFormField: FieldConfig, deleteField = false) {
    const formToSave = cloneDeep(pollFormField);
    formToSave.options = pollFormField.options.filter(option => option.active || option.choiceID);
    formToSave.validations = pollFormField.validations.filter(val => val.active || val.validationID);

    if (deleteField) {
      formToSave.active = false;
    }

    return this.formMutatuinService.savePollFormData(this.selectedForm.value, formToSave);
  }
}
