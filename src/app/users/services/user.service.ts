import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { StorageService } from '../../storage/storage.service';
import { AuthenticationModel } from '../../models/authentication.model';
import { UserModel } from '../../models/user.model';
import { TokenModel } from '../../models/token.model';
import { UserPasswordModel } from '../../models/user-password.model';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUserUrl = 'http://localhost:3000/api/users'; 

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {}


  register(authentication: AuthenticationModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.apiUserUrl}`, authentication)
    .pipe(
      tap(token => {
        this.authenticationService.getAuthenticatedSubject().next(true);
        this.storageService.saveAccessToken(token);
      })
    );
  }

  update(userModel: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUserUrl}`, userModel).pipe(
      tap(() => {
        this.storageService.savePhotoUrl(userModel.photoUrl);
      })
    );
  }

  get(): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUserUrl}`);
  }

  updatePassword(userPasswordModel: UserPasswordModel): Observable<any> {
    return this.http.put(`${this.apiUserUrl}/password`, userPasswordModel);
  }
}
