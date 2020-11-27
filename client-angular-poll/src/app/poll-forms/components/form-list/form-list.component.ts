import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormUpdateService } from '../../services/form-update.service';
import { Router } from '@angular/router';
import { PollFormQueryService } from 'src/services/poll/poll-form-query.service';
import { PollItem } from '../../models/poll-item.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'hold-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  formList: PollItem[];

  dataSource: MatTableDataSource<PollItem> = new MatTableDataSource();
  displayedColumns: string[];

  constructor(
    private pollQueryService: PollFormQueryService,
    private formUpdateService: FormUpdateService,
    private router: Router
    ) { }

  async ngOnInit() {
    this.formList = await this.pollQueryService.getFormList().toPromise();
    this.dataSource.data = this.formList;
    this.displayedColumns = ['pollName', 'availableFrom', 'availableTo', 'createdAt', 'pollTypeDescription'];
  }

  handelResult(row) {
    if (row && row.pollID) {
      this.formUpdateService.setSelectedForm(row.pollID);
      this.router.navigate(['poll/builder']);
    }
  }

}
