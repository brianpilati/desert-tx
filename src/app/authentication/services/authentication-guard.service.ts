import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../../storage/storage.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.storageService.isTokenActive()) {
      return true;
    }

    this.authenticationService.logout();
    return false;
  }
}
