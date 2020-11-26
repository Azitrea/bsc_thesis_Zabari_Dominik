import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FieldConfig } from '../../models/field.model';
import { FormUpdateService } from '../../services/form-update.service';
import * as _ from 'lodash';
import { PollFormQueryService } from 'src/services/poll/poll-form-query.service';

@Component({
  selector: 'hold-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  newField: FieldConfig = null;
  index: number = null;

  inputTypeList;
  validationTypeList;
  validationMatrix;

  filteredValidationArray;

  subscription: Subscription = new Subscription();

  constructor(
    private formUpdateService: FormUpdateService,
    private pollQueryService: PollFormQueryService,
    ) { }

  async ngOnInit() {
    this.inputTypeList = await this.pollQueryService.getQuestionTypeList().toPromise();
    this.validationTypeList = await this.pollQueryService.getValidationTypeList().toPromise();
    this.validationMatrix = await this.pollQueryService.getValidationMatrix().toPromise();

    this.subscription = this.formUpdateService.getFieldToEdit().subscribe(
      (field: {field: FieldConfig, index: number}) => {
        this.newField = _.cloneDeep(field.field);
        this.index = field.index;

        this.filterValidationArray();
    });
  }

  createNew() {
    const baseModel: FieldConfig = {
      questionID: null,
      typeID: null,
      type: '',
      typeDescription: '',
      name: '',
      displayText: '',
      questionName: '',
      choiceAvailable: false,
      active: true,
      validations: [],
      options: []
    };
    this.formUpdateService.setFieldToEdit(baseModel, null);
  }

  saveField() {
    this.formUpdateService.updateAndSavePoll(this.newField).toPromise().then(res => {
      console.log(res);
      this.formUpdateService.setFormUpdateEvent(res[0], this.index);
    }).catch(err => {
      console.log(err);
    });
  }

  deleteField() {
    this.formUpdateService.updateAndSavePoll(this.newField, true).toPromise().then(res => {
      console.log(res);
      this.formUpdateService.setFormUpdateEvent(null, this.index, true);
    }).catch(err => {
      console.log(err);
    });
  }

  cancelEdit() {
    this.formUpdateService.setFieldToEdit(null, null);
  }

  editType(event) {
    const selected = this.inputTypeList.find(x => x.questionTypeID === event);
    this.newField.type = selected.questionName;
    this.newField.typeDescription = selected.questionDescription;
    this.newField.choiceAvailable = selected.choiceAvailable;

    this.filterValidationArray();
  }

  filterValidationArray() {
    this.filteredValidationArray = [];
    if (!this.newField || !this.newField.typeID) {
      return null;
    }
    this.validationMatrix[this.newField.typeID].forEach(valTypeMatrix => {
      const found = this.validationTypeList.find(valType => valTypeMatrix.valTypeID === valType.valTypeID);
      if (found) {
        found.canHaveValue = valTypeMatrix.value;
        this.filteredValidationArray.push(found);
      }
    });

    this.newField.validations.map(validation => {
      const found = this.filteredValidationArray.find(filteredValidation => filteredValidation.valTypeID === validation.typeID);
      if (!found) {
        validation.active = false;
      }
    });
  }

  ngOnDestoroy() {
    this.subscription.unsubscribe();
  }

}
