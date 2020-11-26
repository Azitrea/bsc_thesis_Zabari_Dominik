import { TestBed } from '@angular/core/testing';

import { PollViewAuthService } from './poll-view-auth.service';

describe('PollViewAuthService', () => {
  let service: PollViewAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollViewAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
