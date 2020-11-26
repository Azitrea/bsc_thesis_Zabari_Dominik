import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { GeoLoc } from 'src/models/geolocation.type';
import { ToastService } from '../toast/toast.service';

const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor(private toastService: ToastService) { }

  async getGeoLocation(): Promise<GeoLoc> {
    const resp = await Geolocation.getCurrentPosition().catch((error) => {
      console.log('Error getting location', error);
      this.toastService.show(error);
      return error;
    });
    return { latitude: resp.coords.latitude, longitude: resp.coords.longitude };
  }
}
