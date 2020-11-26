import { TestBed } from '@angular/core/testing';

import { ValidatorMapperService } from './validator-mapper.service';

describe('ValidatorMapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidatorMapperService = TestBed.get(ValidatorMapperService);
    expect(service).toBeTruthy();
  });
});
