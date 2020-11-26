import { TestBed } from '@angular/core/testing';

import { CheckboxValidatorService } from './checkbox-validator.service';

describe('CheckboxValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckboxValidatorService = TestBed.get(CheckboxValidatorService);
    expect(service).toBeTruthy();
  });
});
