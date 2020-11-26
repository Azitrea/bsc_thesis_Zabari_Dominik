import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormUpdateService } from './form-update.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardFormBuilderService implements CanActivate {

  constructor(
    private formUpdateService: FormUpdateService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.formUpdateService.getSelectedForm().pipe(
      take(1),
      map((pollID) => {
        if (pollID) {
          return true;
        } else {
          this.router.navigate(['poll/list']);
          return false;
        }
      }));
  }
}
