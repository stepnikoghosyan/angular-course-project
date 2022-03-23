import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';

// services
import { StorageService } from '@shared/services/storage.service';
import { AuthService } from '../modules/auth/services/auth.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
    private readonly storageService: StorageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addTokenToRequest(req))
      .pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              if (this.authService.isAuthenticated) {
                this.authService.logout();
              }

              return EMPTY;
            }

            if (error.status === 403) {
              this.notificationsService.showNotification({
                type: NotificationTypes.ERROR,
                message: 'Access Denied',
              });

              return EMPTY;
            }

            if (error.status >= 500) {
              this.notificationsService.showNotification({
                type: NotificationTypes.ERROR,
                message: 'Internal Server Error',
              });
              return EMPTY;
            }
          }

          return throwError(() => error);
        }),
      );
  }

  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.storageService.getAccessToken();
    if (!token) {
      return request;
    }

    return request.clone({ setHeaders: { Authorization: `Bearer ${ token }` } });
  }
}
