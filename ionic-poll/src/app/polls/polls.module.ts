import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollsPageRoutingModule } from './polls-routing.module';

import { PollsPage } from './polls.page';
import { DynamicFormDirective } from 'src/directives/dynamic-form.directive';
import { InputComponent } from './input-types/input/input.component';
import { CheckboxComponent } from './input-types/checkbox/checkbox.component';
import { CheckboxMultiComponent } from './input-types/checkbox-multi/checkbox-multi.component';
import { DateComponent } from './input-types/date/date.component';
import { PhotoComponent } from './input-types/photo/photo.component';
import { RadioComponent } from './input-types/radio/radio.component';
import { SelectComponent } from './input-types/select/select.component';
import { TextareaComponent } from './input-types/textarea/textarea.component';

import { PollViewComponent } from './poll-view/poll-view.component';

import { DisplayTextHeaderComponent } from './display-text-header/display-text-header.component';
import { ValidationDisplayComponent } from './validation-display/validation-display.component';
import { PollFormGenerationService } from 'src/services/poll/poll-form-generation.service';
import { GeolocationService } from 'src/services/location/geolocation.service';
import { PhotoService } from 'src/services/photo/photo.service';
import { PollQueryService } from 'src/services/poll/poll-query.service';
import { PollViewAuthService } from 'src/services/poll/poll-view-auth.service';
import { CheckboxValidatorService } from 'src/validators/poll-validators/checkbox-validator.service';
import { DateValidatorService } from 'src/validators/poll-validators/date-validator.service';
import { ExtraValidatorService } from 'src/validators/poll-validators/extra-validator.service';
import { ValidatorMapperService } from 'src/validators/poll-validators/validator-mapper.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PollsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    PollsPage,
    PollViewComponent,
    DynamicFormDirective,
    InputComponent,
    CheckboxComponent,
    CheckboxMultiComponent,
    DateComponent,
    PhotoComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent,
    DisplayTextHeaderComponent,
    ValidationDisplayComponent,
  ],
  providers: [
    PollFormGenerationService,
    PollQueryService,
    DateValidatorService,
    ExtraValidatorService,
    CheckboxValidatorService,
    ValidatorMapperService,
    GeolocationService,
    PhotoService,
    PollViewAuthService
  ],
  entryComponents: [
    InputComponent,
    CheckboxComponent,
    CheckboxMultiComponent,
    DateComponent,
    PhotoComponent,
    RadioComponent,
    SelectComponent,
    TextareaComponent
  ]
})
export class PollsPageModule { }
