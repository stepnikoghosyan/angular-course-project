import { APP_INITIALIZER } from '@angular/core';

// services
import { AuthService } from '../modules/auth/services/auth.service';

function appInitializer(authService: AuthService) {
  return () => authService.initAppAndCheckCurrentLoggedInUser();
}

export const appInitializerInterceptor = {
  provide: APP_INITIALIZER,
  useFactory: appInitializer,
  deps: [AuthService],
  multi: true,
};
