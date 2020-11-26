
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }

  async canActivate(): Promise<boolean> {
    const token = localStorage.getItem(environment.authTokenKey);
    try {
      const isTokenValid = await this.userService.validToken(token).toPromise();
      console.log('validToken: ', isTokenValid);
      if (!isTokenValid) {
        localStorage.clear();
        this.router.navigateByUrl('auth/login');
        return false;
      }
      return true;
    } catch (err) {
      localStorage.clear();
      this.router.navigateByUrl('auth/login');
      return false;
    }
  }
}
