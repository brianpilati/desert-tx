import { Inject, Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';

@Injectable()
export class StorageService {
  constructor(@Inject('LOCAL_STORAGE') private localStorage: any) {}

  private clearAccessToken(): void {
    if (this.localStorage.accessToken) {
      this.localStorage.removeItem('accessToken');
      this.localStorage.removeItem('accessTokenExpiration');
    }
  }

  private setTokenExpiration() {
    this.localStorage.accessTokenExpiration = 
    Date.now() + 60 * 60 * 1000;
  }

  saveAccessToken(tokenModel: TokenModel): void {
    this.setTokenExpiration();
    this.localStorage.accessToken = tokenModel.token;
  }

  isTokenActive(): boolean {
    return this.localStorage.accessTokenExpiration > Date.now() && this.getAccessToken();
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