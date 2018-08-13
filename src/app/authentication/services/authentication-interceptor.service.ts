import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../storage/storage.service';
import { tap, map, catchError, last } from 'rxjs/internal/operators';
import { Router } from '../../../../node_modules/@angular/router';
import { UNAUTHORIZED } from '../../../../node_modules/http-status-codes';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  storageService: StorageService;

  constructor(private injector: Injector) {}

  private getAccessToken(): string {
    if (!this.storageService) {
      this.storageService = this.injector.get(StorageService);
    }

    return this.storageService.getAccessToken();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.getAccessToken()}`,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request).pipe(catchError((error) => {
      if (error.status == UNAUTHORIZED) {
        const router = this.injector.get(Router);
        router.navigateByUrl('/auth');
      }
      return of(error);
    }) as any);
  }
}
