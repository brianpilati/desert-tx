import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../../storage/storage.service';
import { HttpStatusService } from '../../http/http-status.service';
import { finalize, tap } from 'rxjs/internal/operators';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(
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
      })
    );
  }
}
