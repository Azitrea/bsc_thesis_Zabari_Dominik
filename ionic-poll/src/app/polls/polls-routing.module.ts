import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { PollViewAuthService } from 'src/services/poll/poll-view-auth.service';
import { PollViewComponent } from './poll-view/poll-view.component';

import { PollsPage } from './polls.page';

const routes: Routes = [
  {
    path: '',
    component: PollsPage
  },
  {
    path: 'view',
    component: PollViewComponent,
    canActivate: [AuthGuard, PollViewAuthService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollsPageRoutingModule {}
