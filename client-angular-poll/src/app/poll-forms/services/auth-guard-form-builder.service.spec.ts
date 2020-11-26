import { TestBed } from '@angular/core/testing';

import { AuthGuardFormBuilderService } from './auth-guard-form-builder.service';

describe('AuthGuardFormBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardFormBuilderService = TestBed.get(AuthGuardFormBuilderService);
    expect(service).toBeTruthy();
  });
});
