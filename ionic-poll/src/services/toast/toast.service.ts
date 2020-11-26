import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async show(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      buttons: [
        {
          side: 'end',
          icon: 'close-outline',
          handler: () => {
            toast.dismiss();
          },
        }
      ]
    });
    toast.present();
  }
}
