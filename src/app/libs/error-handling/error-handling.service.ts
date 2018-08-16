import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { UNAUTHORIZED, BAD_REQUEST, FORBIDDEN } from 'http-status-codes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {
  static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string =
    'An error occurred: Please click this message to login';

  constructor(
    private injector: Injector,
    private zone: NgZone
  ) {}

  public handleError(error: any) {
    const router = this.injector.get(Router);
    const authenticationService = this.injector.get(AuthenticationService);
    const httpErrorCode = error.httpErrorCode;
    switch (httpErrorCode) {
      case UNAUTHORIZED:
        authenticationService.logout();
        break;
      case FORBIDDEN:
        router.navigateByUrl('/unauthorized');
        break;
      case BAD_REQUEST:
        this.showError(error.message);
        break;
      default:
        this.showError(ErrorHandlerService.REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE);
    }
  }

  public error<T>(caller = 'unknown', operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.showError(`${caller} ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private showError(message: string) {
    const matSnackBar = this.injector.get(MatSnackBar);
    this.zone.run(() => {
      matSnackBar.openFromComponent(SnackBarComponent, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 10000,
        data: message
      });
    });
  }
}
