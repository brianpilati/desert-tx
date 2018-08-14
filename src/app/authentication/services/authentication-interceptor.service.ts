import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../storage/storage.service';
import { catchError, last } from 'rxjs/internal/operators';
import { UNAUTHORIZED } from '../../../../node_modules/http-status-codes';
import { AuthenticationService } from './authentication.service';

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
        const authenticationService = this.injector.get(AuthenticationService);
        authenticationService.logout();
      }
      return of(error);
    }) as any);
  }
}
