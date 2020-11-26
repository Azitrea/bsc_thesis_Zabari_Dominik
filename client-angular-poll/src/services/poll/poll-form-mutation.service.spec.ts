import { TestBed } from '@angular/core/testing';

import { PollFormMutationService } from './poll-form-mutation.service';

describe('PollFormMutationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollFormMutationService = TestBed.get(PollFormMutationService);
    expect(service).toBeTruthy();
  });
});
