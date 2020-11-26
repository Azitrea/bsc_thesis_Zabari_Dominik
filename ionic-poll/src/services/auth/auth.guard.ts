import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private storage: Storage,
    private authService: AuthService
  ) { }

  async canActivate(): Promise<boolean> {
    return await this.storage.get('token').then((token: string) => {
      if (!token) {
        this.authService.logout('A token lejárt.');
      }
      return !!token;
    });
  }
}
