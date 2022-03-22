import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

// services
import { AuthService } from '../modules/auth/services/auth.service';
import { AppStateService } from '../services/app-state.service';
import { getFullRoute } from '@shared/utils/get-full-route.helper';
import { AppRoutes } from '@shared/models/app-routes.model';

@Injectable({ providedIn: 'root' })
export class NotAuthGuard implements CanLoad, CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly appStateService: AppStateService,
    private readonly router: Router,
  ) {
  }

  canLoad(): boolean {
    return this.isNotAuthenticated();
  }

  canActivate(): boolean {
    return this.isNotAuthenticated();
  }

  private isNotAuthenticated(): boolean {
    if (this.authService.isAuthenticated) {
      this.router.navigate([getFullRoute(AppRoutes.Home)]);
      return false;
    }

    return true;
  }
}
