import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { StorageService } from '../../storage/storage.service';
import { AuthenticationModel } from '../../models/authentication.model';
import { Router } from '@angular/router';
import { TokenModel } from '../../models/token.model';

@Injectable()
export class AuthenticationService {
  private apiAuthUrl = 'http://localhost:3000/api/auth'; 
  private isAuthenticatedSubject = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  getAuthenticatedSubject(): Subject<boolean> {
    return this.isAuthenticatedSubject
  }

  authenticate(authentication: AuthenticationModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.apiAuthUrl}`, authentication)
    .pipe(
      tap(token => {
        this.storageService.saveAccessToken(token)
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  isAuthPage(): void {
    this.isAuthenticatedSubject.next(false);
  }

  logout(): void {
    this.http.get(`${this.apiAuthUrl}/logout` ).subscribe(() => {
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['auth']);
    });
    this.storageService.clearStorage();
  }
}