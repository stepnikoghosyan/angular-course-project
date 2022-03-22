import { APP_INITIALIZER } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';

// services
import { AuthService } from '../modules/auth/services/auth.service';
import { UsersService } from '../modules/users/services/users.service';

function appInitializer(authService: AuthService, usersService: UsersService) {
  return () => {
    return new Promise<void>((resolve, reject) => {
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
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              resolve();
            } else {
              reject(err);
            }
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
