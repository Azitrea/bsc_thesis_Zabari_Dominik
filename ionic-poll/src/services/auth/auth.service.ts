import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { take } from 'rxjs/operators';
import { ILoginResponse } from 'src/models/common';
import { ApiService } from '../api/api.service';
import { ToastService } from '../toast/toast.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private apiService: ApiService,
    private toastService: ToastService,
    private storage: Storage,
    private menu: MenuController
  ) { }

  async login(username: string, password: string): Promise<void> {
    this.http
      .post<ILoginResponse>(this.apiService.login(), {
        username,
        password,
      })
      .pipe(take(1))
      .subscribe((response) => {
        if (response.success) {
          this.storage.set('userID', response.id);
          this.storage.set('user', response.user);
          this.storage.set('token', response.token);
          this.menu.enable(true);
          this.navCtrl.navigateForward('dashboard');
        } else {
          this.toastService.show(response.message);
        }
      });
  }

  logout(message = 'Sikeres kijelentkezés!'): void {
    this.toastService.show(message);
    this.storage.clear();
    this.navCtrl.navigateBack('login');
  }
}
