import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { GeoLoc } from 'src/models/geolocation.type';
import { IQuestionSetupItem, InputType } from 'src/models/poll';
import { GeolocationService } from 'src/services/location/geolocation.service';
import { PhotoService } from 'src/services/photo/photo.service';
import { PollFormGenerationService } from 'src/services/poll/poll-form-generation.service';
import { PollMutationService } from 'src/services/poll/poll-mutation.service';
import { PollQueryService } from 'src/services/poll/poll-query.service';
import { ToastService } from 'src/services/toast/toast.service';



@Component({
  selector: 'app-poll-view',
  templateUrl: './poll-view.component.html',
  styleUrls: ['./poll-view.component.scss'],
})
export class PollViewComponent implements OnInit {
  form: FormGroup;
  fields: IQuestionSetupItem[];

  pollID: number = null;

  location: Promise<GeoLoc>;

  constructor(
    private geoLocation: GeolocationService,
    private pollQueryService: PollQueryService,
    private pollMutationService: PollMutationService,
    private pollFormGenerationService: PollFormGenerationService,
    private photoService: PhotoService,
    private toastService: ToastService,
    private navCtrl: NavController
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.pollID = this.pollFormGenerationService.getSelectedForm().value;

    this.location = this.geoLocation.getGeoLocation();
    this.fields = await this.pollQueryService.getPollForm(this.pollID).toPromise();
    console.log(this.fields);
    this.form = this.pollFormGenerationService.createControl(this.fields);
    console.log(this.form);
  }

  async save() {
    console.log(this.form);

    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('pollID', this.pollID.toString())

    const keys = Object.keys(this.form.value);
    for (let key of keys) {
      const typeObject = this.fields.find(field => field.name === key.toString());
      if (typeObject) {
        switch (typeObject.type) {
          case InputType.PHOTO: {
            for (let image of this.form.value[key]) {
              const imageData = await this.photoService.readOneFile(image.filepath);
              const base64 = await fetch(`data:image/jpeg;base64,${imageData}`);
              const blob = await base64.blob();
              formData.append(key, JSON.stringify(image));
              formData.append(key, blob, image.filepath);
            }
            break;
          }
          default: {
            formData.append(key, JSON.stringify(this.form.value[key]));
          }
        }
      }
    }

    console.log('FormData', formData);

    this.pollMutationService.saveFormData(formData).subscribe(res => {
      console.log(res);
      this.toastService.show(res.message);

      if (res.success) {
        this.pollFormGenerationService.setSelectedForm(null);
        this.navCtrl.navigateRoot('polls');
      }
    });
  }

  ionViewWillLeave() {
    this.pollFormGenerationService.setSelectedForm(null);
  }
}
