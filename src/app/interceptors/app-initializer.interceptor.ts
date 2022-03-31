import { APP_INITIALIZER } from '@angular/core';
import { take } from 'rxjs';

// services
import { AuthService } from '../modules/auth/services/auth.service';
import { UsersService } from '../modules/users/services/users.service';

function appInitializer(authService: AuthService, usersService: UsersService) {
  return () => {
    return new Promise<void>((resolve) => {
      if (!authService.isAuthenticated) {
        resolve();
        return;
      }

      usersService.getCurrentUser()
        .pipe(take(1))
        .subscribe({
          next: () => {
            resolve();
          },
          error: () => {
            authService.logout();
            resolve();
          },
        });
    });
  };
}

export const appInitializerInterceptor = {
  provide: APP_INITIALIZER,
  useFactory: appInitializer,
  deps: [AuthService, UsersService],
  multi: true,
};
