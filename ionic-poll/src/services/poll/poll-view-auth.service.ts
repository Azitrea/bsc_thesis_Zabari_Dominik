import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PollFormGenerationService } from './poll-form-generation.service';

@Injectable({
  providedIn: 'root'
})
export class PollViewAuthService implements CanActivate {

  constructor(
    private navController: NavController,
    private formGenerationService: PollFormGenerationService
  ) { }

  canActivate(): Observable<boolean> {
    return this.formGenerationService.getSelectedForm().pipe(
      take(1),
      map((pollID) => {
        if (pollID) {
          return true;
        } else {
          this.navController.navigateBack('polls');
          return false;
        }
      }));
  }
}
