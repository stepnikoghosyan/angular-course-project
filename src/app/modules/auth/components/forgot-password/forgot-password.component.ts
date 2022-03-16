import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

// services
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';

// dto
import { ForgotPasswordDto } from '../../models/dto/forgot-password.dto';

// validators
import { emailValidator } from '../../validators/email.validator';

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

    this.authService.forgotPassword(new ForgotPasswordDto({ email: this.emailCtrl.value }))
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
