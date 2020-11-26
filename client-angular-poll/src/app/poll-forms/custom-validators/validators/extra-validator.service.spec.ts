import { TestBed } from '@angular/core/testing';

import { ExtraValidatorService } from './extra-validator.service';

describe('ExtraValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtraValidatorService = TestBed.get(ExtraValidatorService);
    expect(service).toBeTruthy();
  });
});
