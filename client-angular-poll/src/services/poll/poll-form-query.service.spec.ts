import { TestBed } from '@angular/core/testing';

import { PollFormQueryService } from './poll-form-query.service';

describe('PollFormQueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollFormQueryService = TestBed.get(PollFormQueryService);
    expect(service).toBeTruthy();
  });
});
