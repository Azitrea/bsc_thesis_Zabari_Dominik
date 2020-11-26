import { TestBed } from '@angular/core/testing';

import { ExtraValidatorService } from './extra-validator.service';

describe('ExtraValidatorService', () => {
  let service: ExtraValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
