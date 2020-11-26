import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { PollFormQueryService } from 'src/services/poll/poll-form-query.service';
import { FieldConfig } from '../../models/field.model';
import { InputType } from '../../models/input-type.model';
import { FormGenerationService } from '../../services/form-generation.service';
import { FormUpdateService } from '../../services/form-update.service';

@Component({
  selector: 'hold-poll-answer-view',
  templateUrl: './poll-answer-view.component.html',
  styleUrls: ['./poll-answer-view.component.scss']
})
export class PollAnswerViewComponent implements OnInit {
  pollID: number;
  pollInstanceID: number;

  fieldConfig: FieldConfig[];
  answerList: any;

  formGroup: FormGroup;

  constructor(
    private pollQueryService: PollFormQueryService,
    private formUpdateService: FormUpdateService,
    private formGenerationService: FormGenerationService
    ) { }

  async ngOnInit() {
    const selectedAnswer = this.formUpdateService.getSelectedAnswer().value;
    this.pollID = selectedAnswer.pollID;
    this.pollInstanceID = selectedAnswer.pollInstanceID;

    const result = await this.pollQueryService.getAnswerSetup(this.pollInstanceID, this.pollID).toPromise();
    this.fieldConfig = result.pollSetup;
    this.answerList = result.answers;

    this.formGroup = this.formGenerationService.createControl(this.fieldConfig);
    this.formGroup.patchValue(this.answerList);
    Object.keys(this.answerList).forEach(key => {
      const found = this.fieldConfig.find(field => +field.questionID === +key);
      if (found) {
        switch (found.type) {
          case InputType.RADIO_BUTTON:
          case InputType.DROPDOWN: {
            console.log(this.answerList[key].choiceID);
            this.formGroup.patchValue({
              [key]: found.options.find(opt => opt.choiceID === this.answerList[key].choiceID)
            });
            break;
          }
          case InputType.PHOTO: {
            const formArray = this.formGroup.get(key) as FormArray;
            this.answerList[key].forEach(img => {
              formArray.push(new FormControl(img));
            });
            break;
          }
        }
      }
    });

    this.formGroup.disable();
  }

}
