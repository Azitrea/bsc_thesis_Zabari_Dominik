import { TestBed } from '@angular/core/testing';

import { PollMutationService } from './poll-mutation.service';

describe('PollMutationService', () => {
  let service: PollMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
