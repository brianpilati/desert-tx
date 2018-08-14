import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { StorageService } from '../../storage/storage.service';
import { AuthenticationModel } from '../../models/authentication.model';
import { UserModel } from '../../models/user.model';
import { TokenModel } from '../../models/token.model';
import { UserPasswordModel } from '../../models/user-password.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUserUrl = 'http://localhost:3000/api/users'; 
  private userProfileUpdatedSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getUserProfileUpdatedSubject(): Subject<boolean> {
    return this.userProfileUpdatedSubject;
  }

  register(authentication: AuthenticationModel): Observable<TokenModel> {
    return this.http.post<TokenModel>(`${this.apiUserUrl}`, authentication)
    .pipe(
      tap(token => this.storageService.saveAccessToken(token))
    );
  }

  update(userModel: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUserUrl}`, userModel).pipe(
      tap(user => {
        this.storageService.savePhotoUrl(userModel.photoUrl);
        this.userProfileUpdatedSubject.next(true);
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
