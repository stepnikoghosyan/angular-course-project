import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

// services
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';

// validators
import { emailValidator } from '../../validators/email.validator';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {

  public isLoading = true;
  public state = 'Verifying Your account, please wait...';

  public showEmailInput = false;

  public emailCtrl = new FormControl('', [Validators.required, emailValidator]);

  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    const activationToken = this.route.snapshot.params['activationToken'];
    if (!activationToken) {

    } else {
      this.verifyAccount(activationToken);
    }
  }

  private verifyAccount(activationToken: string): void {
    this.authService.verifyAccount(activationToken)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.notificationsService.showNotification({
            type: NotificationTypes.SUCCESS,
            title: 'Success',
            message: 'Account verified',
          });

          this.router.navigate(['/auth/login']);
        },
        error: (err: HttpErrorResponse) => {
          const errorMsg = (err.error as IApiErrorResponse).message || 'Unknown Error Occurred';
          this.notificationsService.showNotification({
            type: NotificationTypes.ERROR,
            title: 'Error',
            message: errorMsg,
          });

          this.state = 'Could not verify account.';
          this.isLoading = false;
        },
      });
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

    this.authService.resendActivationToken(this.emailCtrl.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.notificationsService.showNotification({
            type: NotificationTypes.SUCCESS,
            title: 'Success',
            message: 'New email was sent to Your email address',
          });

          this.router.navigate(['/auth/login']);
        },
        error: (error: HttpErrorResponse) => {
          const message = (error.error as IApiErrorResponse).message || 'Unknown Error Occurred';
          this.notificationsService.showNotification({
            type: NotificationTypes.ERROR,
            title: 'Error',
            message,
          });

          this.isLoading = false;
        },
      });
  }
}
