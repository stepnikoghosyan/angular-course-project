import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

// services
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.isAuthenticated();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isAuthenticated();
  }

  private isAuthenticated(): boolean {
    if (this.authService.isAuthenticated) {
      return true;
    }

    this.authService.logout();
    return false;
  }
}
