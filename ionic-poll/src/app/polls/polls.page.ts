import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IPollItem } from 'src/models/poll';
import { PollFormGenerationService } from 'src/services/poll/poll-form-generation.service';
import { PollQueryService } from 'src/services/poll/poll-query.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.page.html',
  styleUrls: ['./polls.page.scss'],
})
export class PollsPage {
  pollList$: Observable<IPollItem[]>;

  constructor(
    private pollQueryService: PollQueryService,
    private pollFormGenerationService: PollFormGenerationService,
    private navCtrl: NavController
    ) {}

  ionViewWillEnter(): void {
    this.pollList$ = this.pollQueryService.getPollList(null, null, null, null, null);
  }

  selectForm(pollID: number) {
    this.pollFormGenerationService.setSelectedForm(pollID);
    this.navCtrl.navigateForward('polls/view');
  }
}
