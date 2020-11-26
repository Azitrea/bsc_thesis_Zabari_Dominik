import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PollFormMutationService } from 'src/services/poll/poll-form-mutation.service';
import { PollFormQueryService } from 'src/services/poll/poll-form-query.service';
import { UserService } from 'src/services/user/user.service';

@Component({
  selector: 'hold-new-form',
  templateUrl: './new-form.component.html',
  styleUrls: ['./new-form.component.scss']
})
export class NewFormComponent implements OnInit {
  @Input() editMode = false;

  pollFormTypeList;
  departmentList;

  pollProjectSelected = true;

  newFormForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private pollQueryService: PollFormQueryService,
    private pollMutation: PollFormMutationService,
    private userService: UserService,
  ) { }

  async ngOnInit() {
    this.newFormForm = this.formBuilder.group({
      pollID: [null],
      pollName: ['', [Validators.required]],
      depID: [null, [Validators.required]],
      projectSelector: [true],
      projectID: [null],
      etapID: [null],
      availableFrom: ['', [Validators.required]],
      availableTo: ['', [Validators.required]],
      pollTypeID: [null, [Validators.required]],
      optional: [false],
      pollStatus: [null],
      active: [true]
    });

    this.pollFormTypeList = await this.pollQueryService.getPollFormTypeList().toPromise();
    this.departmentList = await this.userService.uspDepartmentList().toPromise();
  }

  async onSubmit() {
    this.newFormForm.markAllAsTouched();
    if (this.newFormForm.invalid) {
      return;
    }

    if (this.pollProjectSelected) {
      this.newFormForm.patchValue({ etapID: null });
    } else {
      this.newFormForm.patchValue({ projectID: null });
    }

    const formID = await this.savePollForm(this.newFormForm.value);
    if (!formID) {
      return;
    }

    this.activeModal.close(formID); // return poll ID
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  async savePollForm(formData) {
    const formID = await this.pollMutation.addRemoveForm(formData).toPromise().catch(error => {
      console.log(error);
      return null;
    });

    return formID;
  }

}
