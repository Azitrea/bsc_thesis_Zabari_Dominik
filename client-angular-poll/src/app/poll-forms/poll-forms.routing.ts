import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormListComponent } from './components/form-list/form-list.component';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { NewFormModalBaseComponent } from './components/new-form-modal-base/new-form-modal-base.component';
import { AuthGuardFormBuilderService } from './services/auth-guard-form-builder.service';
import { InstanceListComponent } from './components/instance-list/instance-list.component';
import { AuthGuardAnswerService } from './services/auth-guard-answer.service';
import { PollAnswerViewComponent } from './components/poll-answer-view/poll-answer-view.component';
import { AuthGuard } from 'src/services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'list',
    component: FormListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'builder',
    component: FormWrapperComponent,
    canActivate: [AuthGuard, AuthGuardFormBuilderService],
  },
  {
    path: 'new',
    component: NewFormModalBaseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'answer-list',
    component: InstanceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'answer-view',
    component: PollAnswerViewComponent,
    canActivate: [AuthGuard, AuthGuardAnswerService],
  },
  { path: '**', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Routing { }
