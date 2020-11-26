import { TestBed } from '@angular/core/testing';
import { InterceptorService } from './interceptor.service';
import { Storage } from '@ionic/storage';
import { UrlSerializer } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaderResponse, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { ToastService } from '@services/toast/toast.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@services/auth/auth.service';

class mockHttpHandler extends HttpHandler {
  handle<T>(req: HttpRequest<T>): Observable<HttpEvent<T>> {
    return of(new HttpHeaderResponse({ headers: req.headers }));
  }
}

describe('InterceptorService', () => {
  let service: InterceptorService;
  let storage: Storage;

  beforeEach(() => {
    storage = new Storage({}, 1);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        InterceptorService,
        { provide: Storage, useValue: storage },
        UrlSerializer
      ]
    });
    service = TestBed.inject(InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return request with token', (done) => {
    spyOn(storage, 'get').and.returnValue(new Promise((resolve) => resolve('token')));
    const request = new HttpRequest('GET', 'url');
    service.intercept(request, new mockHttpHandler()).subscribe((res: HttpHeaderResponse) => {
      expect(res.headers.get('Authorization')).toEqual('token');
      done();
    });
  });

  it('should return request without token', (done) => {
    spyOn(storage, 'get').and.returnValue(new Promise((resolve) => resolve(null)));
    const request = new HttpRequest('GET', 'url');
    service.intercept(request, new mockHttpHandler()).subscribe((res: HttpHeaderResponse) => {
      expect(res.headers.get('Authorization')).toBeNull();
      done();
    });
  });

  it('should handle errors with status 500', (done) => {
    const toastService = TestBed.inject(ToastService);
    spyOn(toastService, 'show');
    const mockHandler = new mockHttpHandler;
    spyOn(mockHandler, 'handle').and.returnValue(throwError(new HttpErrorResponse({
      error: {
        statusCode: 500,
        message: 'Internal server error message'
      }
    })));
    service.intercept(new HttpRequest('GET', 'url'), mockHandler).subscribe(
      response => {
        fail(response);
        done();
      },
      err => {
        expect(toastService.show).toHaveBeenCalledWith('Internal server error message');
        done();
      });
  });

  it('should handle errors with status 401', (done) => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'logout');
    const mockHandler = new mockHttpHandler;
    spyOn(mockHandler, 'handle').and.returnValue(throwError(new HttpErrorResponse({
      error: {
        statusCode: 401,
        message: 'Unauthorized error message'
      }
    })));
    service.intercept(new HttpRequest('GET', 'url'), mockHandler).subscribe(
      response => {
        fail(response);
        done();
      },
      err => {
        expect(authService.logout).toHaveBeenCalledWith('Lejárt a token.');
        done();
      });
  });
});
