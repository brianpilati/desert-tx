import { Inject, Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor(@Inject('LOCAL_STORAGE') private localStorage: any) {}

  private clearAccessToken(): void {
    if (this.localStorage.accessToken) {
      this.localStorage.removeItem('accessToken');
    }
  }

  saveAccessToken(accessToken: string): void {
    this.localStorage.accessToken = accessToken;
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