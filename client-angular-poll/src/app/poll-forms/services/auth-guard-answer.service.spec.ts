import { TestBed } from '@angular/core/testing';

import { AuthGuardAnswerService } from './auth-guard-answer.service';

describe('AuthGuardAnswerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardAnswerService = TestBed.get(AuthGuardAnswerService);
    expect(service).toBeTruthy();
  });
});
