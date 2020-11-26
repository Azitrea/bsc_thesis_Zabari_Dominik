import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormUpdateService } from '../../services/form-update.service';
import { Router } from '@angular/router';
import { PollFormQueryService } from 'src/services/poll/poll-form-query.service';

@Component({
  selector: 'hold-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  formList$: Observable<any>;

  constructor(
    private pollQueryService: PollFormQueryService,
    private formUpdateService: FormUpdateService,
    private router: Router
    ) { }

  ngOnInit() {
    this.formList$ = this.pollQueryService.getFormList();
  }

  handelResult(event) {
    switch (event.action) {
      case 'FIELD_CLICK': {
        this.formUpdateService.setSelectedForm(event.value.pollID);
        this.router.navigate(['poll/builder']);
      }
    }
  }

}
