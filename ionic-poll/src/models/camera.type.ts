import { GeoLoc } from './geolocation.type';
export interface Photo {
  filepath: string;
  webviewPath: string;
  location?: GeoLoc
}
