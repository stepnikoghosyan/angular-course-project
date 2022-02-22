import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { emailValidator } from '../../validators/email.validator';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {


  public emailCtrl = new FormControl('', [Validators.required, emailValidator]);

  public isLoading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
    private readonly router: Router,
  ) {
  }

  public onSubmit(): void {
    if (this.isLoading) {
      return;
    }

    this.emailCtrl.markAsTouched();

    if (!this.emailCtrl.valid) {
      return;
    }

    this.isLoading = true;

    this.authService.forgotPassword(this.emailCtrl.value)
      .pipe(take(1))
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      });
  }

  private handleSuccess(): void {
    this.notificationsService.showNotification({
      type: NotificationTypes.SUCCESS,
      title: 'Success',
      message: 'An email was sent to Your email address for password reset',
    });

    this.router.navigate(['/auth/login']);
  }

  private handleError(error: HttpErrorResponse): void {
    const message = (error.error as IApiErrorResponse).message || 'Unknown Error Occurred';
    this.notificationsService.showNotification({
      type: NotificationTypes.ERROR,
      title: 'Error',
      message,
    });

    this.isLoading = false;
  }
}
