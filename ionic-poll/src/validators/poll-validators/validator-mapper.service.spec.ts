import { TestBed } from '@angular/core/testing';

import { ValidatorMapperService } from './validator-mapper.service';

describe('ValidatorMapperService', () => {
  let service: ValidatorMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
