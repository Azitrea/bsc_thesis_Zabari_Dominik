import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth/auth.service';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private storage: Storage,
    private toastService: ToastService,
    private authService: AuthService
  ) { }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    return from(this.addToken(request, next)).pipe(catchError((response: HttpErrorResponse) => {
      switch (response.error?.statusCode) {
      case 401:
        this.authService.logout('Lejárt a token.');
        break;
      case 500:
      default:
        this.toastService.show(response.error.message);
        break;
      }
      return throwError(response);
    }));
  }

  private async addToken<T>(request: HttpRequest<T>, next: HttpHandler): Promise<HttpEvent<T>> {
    return this.storage.get('token').then(token => {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: token
          }
        });
      }
      return next.handle(request).toPromise();
    });
  }

}
