import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormUpdateService } from './form-update.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAnswerService {

  constructor(
    private formUpdateService: FormUpdateService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.formUpdateService.getSelectedAnswer().pipe(
      take(1),
      map((res) => {
        if (res && res.pollID && res.pollInstanceID) {
          return true;
        } else {
          this.router.navigate(['poll/answer-list']);
          return false;
        }
      }));
  }
}
