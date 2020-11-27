import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPollInstance } from '../../models/poll-item.model';
import { FormUpdateService } from '../../services/form-update.service';
import { Router } from '@angular/router';
import { PollFormQueryService } from 'src/services/poll/poll-form-query.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'hold-instance-list',
  templateUrl: './instance-list.component.html',
  styleUrls: ['./instance-list.component.scss']
})
export class InstanceListComponent implements OnInit {
  list: IPollInstance[];

  dataSource: MatTableDataSource<IPollInstance> = new MatTableDataSource();
  displayedColumns: string[];

  constructor(
    private pollQueryService: PollFormQueryService,
    private formUpdateService: FormUpdateService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.list = await this.pollQueryService.getInstanceList(null, null).toPromise();
    this.dataSource.data = this.list;
    this.displayedColumns = ['pollName', 'loginName', 'createdAt'];
  }

  handleResult(row) {
    if (row && row.pollID && row.pollInstanceID) {
      this.formUpdateService.setSelectedAnswer(row.pollID, row.pollInstanceID);
      this.router.navigate(['poll/answer-view']);
    }
  }
}
