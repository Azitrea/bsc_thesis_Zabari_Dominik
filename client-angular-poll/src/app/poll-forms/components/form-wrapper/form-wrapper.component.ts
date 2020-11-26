import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { PollFormQueryService } from 'src/services/poll/poll-form-query.service';
import { FieldConfig } from '../../models/field.model';
import { FormUpdateService } from '../../services/form-update.service';

@Component({
  selector: 'hold-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit, OnDestroy {
  config: FieldConfig[] = [];
  selectedFormID: number;

  error = null;

  subscription: Subscription = new Subscription();

  constructor(
    private pollService: PollFormQueryService,
    private formUpdateService: FormUpdateService,
    private formUpdate: FormUpdateService,
    ) { }

  ngOnInit() {
    this.formUpdateService.getSelectedForm().pipe(take(1)).subscribe(pollID => {
      if (pollID) {
        this.selectedFormID = pollID;
        this.loadForm(pollID);
      }
    });
  }

  loadForm(pollID) {
    this.pollService.getPollQuestionSetup(pollID)
    .subscribe((res: FieldConfig[]) => {
      console.log('LoadedForm: ', res);
      this.config = res;
      this.formUpdate.setFieldToEdit(null, null);
    }, (error) => {
      console.error(error);
      this.error = error.message;
    });
  }

  ngOnDestroy() {
    this.formUpdateService.setSelectedForm(null);
    this.subscription.unsubscribe();
  }

}
