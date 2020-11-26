import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/services/auth/auth.service';
import { ToastService } from 'src/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private menu: MenuController,
  ) { }

  ionViewWillEnter(): void {
    this.menu.enable(false);
  }

  ionViewWillLeave(): void {
    this.menu.enable(true);
  }

  login(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value.username, this.form.value.password);
    } else {
      this.toastService.show('Minden mező kitöltése kötelező!');
    }
  }
}
