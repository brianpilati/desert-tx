import { Inject, Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';
import { Subject } from 'rxjs';

@Injectable()
export class StorageService {
  private userProfileUpdatedSubject = new Subject<boolean>();

  constructor(@Inject('LOCAL_STORAGE') private localStorage: any) {}

  private clearAccessToken(): void {
    if (this.localStorage.accessToken) {
      this.localStorage.removeItem('accessToken');
      this.localStorage.removeItem('uid');
      this.localStorage.removeItem('photoUrl');
      this.localStorage.removeItem('accessTokenExpiration');
    }
  }

  private setTokenExpiration() {
    this.localStorage.accessTokenExpiration = 
    Date.now() + 60 * 60 * 1000 * 2;
  }

  getUserProfileUpdatedSubject(): Subject<boolean> {
    return this.userProfileUpdatedSubject;
  }

  savePhotoUrl(photoUrl: string): void {
    this.localStorage.photoUrl = photoUrl;
    this.userProfileUpdatedSubject.next(true);
  }

  saveAccessToken(tokenModel: TokenModel): void {
    this.setTokenExpiration();
    this.localStorage.accessToken = tokenModel.token;
    this.localStorage.uid = tokenModel.uid;
    this.savePhotoUrl(tokenModel.photoUrl);
  }

  isTokenActive(): boolean {
    return this.localStorage.accessTokenExpiration > Date.now() && this.getAccessToken();
  }

  getUserId(): string {
    return this.localStorage.uid;
  }

  getUserPhotoUrl(): string {
    return this.localStorage.photoUrl || '';
  }

  getAccessToken(): any {
    if (this.localStorage.accessToken) {
      return this.localStorage.accessToken;
    }
    return;
  }

  clearStorage(): void {
    this.clearAccessToken();
  }
}