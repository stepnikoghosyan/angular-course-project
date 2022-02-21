import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { appInitializerInterceptor } from './app-initializer.interceptor';

export const interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  appInitializerInterceptor,
];
