import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../storage/storage.service';
import { catchError, tap, finalize } from 'rxjs/internal/operators';
import { UNAUTHORIZED } from 'http-status-codes';
import { AuthenticationService } from './authentication.service';
import { HttpStatusService } from '../../http/http-status.service';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private httpStatusService: HttpStatusService
  ) { }

  private getAccessToken(): string {
    return this.storageService.getAccessToken();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `${this.getAccessToken()}`,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request).pipe(
      tap(() => {
        this.httpStatusService.emitHttpStatus(true);
      }),
      finalize(() => {
        this.httpStatusService.emitHttpStatus(false);
      }),
      catchError((error) => {
        if (error.status === UNAUTHORIZED) {
          this.authenticationService.logout();
        }
        return of(error);
      }) as any
    );
  }
}
