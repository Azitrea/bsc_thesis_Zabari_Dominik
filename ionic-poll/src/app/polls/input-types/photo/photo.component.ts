
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { Photo } from 'src/models/camera.type';
import { IQuestionSetupItem } from 'src/models/poll';
import { GeolocationService } from 'src/services/location/geolocation.service';
import { PhotoService } from 'src/services/photo/photo.service';


@Component({
  selector: 'app-camera',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent {
  @Input() group: FormGroup;
  @Input() field: IQuestionSetupItem;
  @Input() index: number;

  constructor(
    private photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private geoLocation: GeolocationService,
  ) { }

  async ionViewWillEnter() {
  }

  async takeNewPhoto() {
    const newPhoto = await this.photoService.takePhoto();
    const savedPhoto = await this.photoService.savePicture(newPhoto);
    const location = await this.geoLocation.getGeoLocation();
    savedPhoto.location = location;

    this.addImageToFormArray(savedPhoto);
  }

  public async showActionSheet(photo: Photo, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(this.formArray.at(position).value);
          this.removeImageFromFormArray(position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

  get formArray(){
    return this.group.controls[this.field.name] as FormArray;
  }

  addImageToFormArray(imageData) {
    this.formArray.push(new FormControl(imageData));
  }

  removeImageFromFormArray(position) {
    this.formArray.removeAt(position);
  }

  ngOnDestroy() { // tmp solution
    for (let i = this.formArray.length - 1; i >= 0; i--) {
      this.photoService.deletePicture(this.formArray.at(i).value);
      this.removeImageFromFormArray(i);
    }
  }

}