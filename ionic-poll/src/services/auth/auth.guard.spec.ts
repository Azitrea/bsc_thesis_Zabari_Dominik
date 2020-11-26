import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Storage } from '@ionic/storage';
import { UrlSerializer } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let storage: Storage;

  beforeEach(() => {
    storage = new Storage({}, 1);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Storage, useValue: storage },
        UrlSerializer
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false', (done) => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'logout');
    spyOn(storage, 'get').and.returnValue(new Promise((resolve) => resolve(false)));
    guard.canActivate().then(value => {
      expect(value).toBeFalse();
      expect(authService.logout).toHaveBeenCalledWith('A token lejárt.');
      done();
    });
  });

  it('should return true', (done) => {
    spyOn(storage, 'get').and.returnValue(new Promise((resolve) => resolve(true)));
    guard.canActivate().then(value => {
      expect(value).toBeTrue();
      done();
    });
  });
});
