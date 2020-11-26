import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormUpdateService } from '../../services/form-update.service';
import { NewFormComponent } from '../new-form/new-form.component';

@Component({
  selector: 'hold-new-form-modal-base',
  templateUrl: './new-form-modal-base.component.html',
  styleUrls: ['./new-form-modal-base.component.scss']
})
export class NewFormModalBaseComponent implements OnInit, OnDestroy {

  constructor(
    private modal: NgbModal,
    private router: Router,
    private formUpdateService: FormUpdateService) { }

  ngOnInit() {
    const modalRef = this.modal.open(NewFormComponent);

    modalRef.result.then(
      (createdPollID) => {
        this.formUpdateService.setSelectedForm(createdPollID);
        this.router.navigate(['poll/builder']);
      }).catch(() => {
        this.router.navigate(['poll/list']);
      });
  }

  ngOnDestroy() {
    this.modal.dismissAll();
  }

}
