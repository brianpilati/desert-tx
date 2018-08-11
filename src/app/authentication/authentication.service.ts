import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { StorageService } from '../storage/storage.service';
import { AuthenticationModel } from '../models/authentication.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  private apiAuthUrl = 'http://localhost:3000/api/auth'; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  authenticate(authentication: AuthenticationModel): Observable<string> {
    return this.http.post<string>(`${this.apiAuthUrl}`, authentication)
    .pipe(
      tap(token => this.storageService.saveAccessToken(token))
    );
  }

  logout(): void {
    this.http.get(`${this.apiAuthUrl}/logout` ).subscribe(() => {
      this.router.navigate(['auth']);
    });
    this.storageService.clearStorage();
  }
}