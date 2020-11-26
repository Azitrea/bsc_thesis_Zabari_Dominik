import { TestBed } from '@angular/core/testing';

import { FormGenerationService } from './form-generation.service';

describe('FormGenerationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormGenerationService = TestBed.get(FormGenerationService);
    expect(service).toBeTruthy();
  });
});
