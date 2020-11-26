import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource
} from '@capacitor/core';
import { Photo } from 'src/models/camera.type';

const { Camera, Filesystem, Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private PHOTO_STORAGE = 'photos';
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  public takePhoto(): Promise<CameraPhoto> {
    return Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }

  public async savePicture(cameraPhoto: CameraPhoto): Promise<Photo> {
    const base64Data = await this._readAsBase64(cameraPhoto);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    if (this.platform.is('hybrid')) {
      // mobile
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // web
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }

  private async _readAsBase64(cameraPhoto: CameraPhoto) {
    if (!cameraPhoto || !cameraPhoto.webPath) {
      return null;
    }

    if (this.platform.is('hybrid')) {
      // mobile
      const file = await Filesystem.readFile({
        path: cameraPhoto.path
      });

      return file.data;
    }
    else {
      // web
      const response = await fetch(cameraPhoto.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  async readOneFile(p) {
    const file = await Filesystem.readFile({
      path: p
    });

    return file.data;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  })

  public setPhotoStorage(photoArray: Photo[], storageKey: string | number) {
    Storage.set({
      key: this.PHOTO_STORAGE + '_' + storageKey.toString(),
      value: JSON.stringify(photoArray)
    });
  }

  public async loadPhotos(storageKey: string | number) {
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE + '_' + storageKey.toString() });
    const photoListFromData = JSON.parse(photoList.value) || [];

    if (!this.platform.is('hybrid')) {
      for (const photo of photoListFromData) {
        let error = null;
        let readFile = { data: null };
        try {
          readFile = await Filesystem.readFile({
            path: photo.filepath,
            directory: FilesystemDirectory.Data
          });
        } catch (err) {
          error = err;
          console.log(error);
        }

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = !error ? `data:image/jpeg;base64,${readFile.data}` : null;
      }
    }

    return photoListFromData;
  }

  public async deletePicture(photo) {
    console.log(photo);
    // delete photo file from filesystem
    const filename = photo.filepath
      .substr(photo.filepath.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.Data
    });
  }
}
