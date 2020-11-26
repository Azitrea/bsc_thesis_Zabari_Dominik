import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PollFormGenerationService } from './poll-form-generation.service';

describe('PollFormGenerationService', () => {
  let service: PollFormGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule
      ]
    });
    service = TestBed.inject(PollFormGenerationService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
