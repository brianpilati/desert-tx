import { Inject, Injectable } from '@angular/core';
import { TokenModel } from '../models/token.model';

@Injectable()
export class StorageService {
  constructor(@Inject('LOCAL_STORAGE') private localStorage: any) {}

  private clearAccessToken(): void {
    if (this.localStorage.accessToken) {
      this.localStorage.removeItem('accessToken');
    }
  }

  saveAccessToken(tokenModel: TokenModel): void {
    this.localStorage.accessToken = tokenModel.token;
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