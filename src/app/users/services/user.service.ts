import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { StorageService } from '../../storage/storage.service';
import { AuthenticationModel } from '../../models/authentication.model';
import { UserModel } from '../../models/user.model';
import { Router } from '@angular/router';
import { TokenModel } from '../../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUserUrl = 'http://localhost:3000/api/users'; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) {}

  register(authentication: AuthenticationModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.apiUserUrl}`, authentication)
    .pipe(
      tap(token => this.storageService.saveAccessToken(token))
    );
  }

  update(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUserUrl}`, user);
  }

  get(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUserUrl}`);
  }
}