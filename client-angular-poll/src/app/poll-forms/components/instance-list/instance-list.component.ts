import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPollInstance } from '../../models/poll-item.model';
import { FormUpdateService } from '../../services/form-update.service';
import { Router } from '@angular/router';
import { PollFormQueryService } from 'src/services/poll/poll-form-query.service';

@Component({
  selector: 'hold-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.scss']
})
export class InstanceListComponent implements OnInit {
  list$: Observable<IPollInstance>;

  constructor(
    private pollQueryService: PollFormQueryService,
    private formUpdateService: FormUpdateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.list$ = this.pollQueryService.getInstanceList(null, null);
  }

  handleResult(event) {
    console.log(event);
    switch (event.action) {
      case 'FIELD_CLICK': {
        console.log(event.value.pollID, event.value.pollInstanceID);
        this.formUpdateService.setSelectedAnswer(event.value.pollID, event.value.pollInstanceID);
        this.router.navigate(['poll/answer-view']);
        break;
      }
    }
  }
}
