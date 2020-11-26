import { TestBed } from '@angular/core/testing';

import { CheckboxValidatorService } from './checkbox-validator.service';

describe('CheckboxValidatorService', () => {
  let service: CheckboxValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckboxValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
