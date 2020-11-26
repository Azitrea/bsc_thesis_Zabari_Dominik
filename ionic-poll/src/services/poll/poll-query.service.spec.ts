import { TestBed } from '@angular/core/testing';

import { PollQueryService } from './poll-query.service';

describe('PollQueryService', () => {
  let service: PollQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
