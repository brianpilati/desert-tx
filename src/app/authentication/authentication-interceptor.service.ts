import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

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

    return next.handle(request);
  }
}
