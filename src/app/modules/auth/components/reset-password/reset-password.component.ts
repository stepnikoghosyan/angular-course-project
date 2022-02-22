import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { AppRoutes } from '@shared/models/app-routes.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public showPasswordAsText = false;
  public responseErrorMsg: string | null = null;

  public passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  private token: string | null = null;

  private subscription: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['resetPasswordToken'];
    if (!this.token) {
      this.router.navigate([AppRoutes.Auth, AppRoutes.Login]);
    }
  }

  public onSubmit(): void {
    if (this.isLoading) {
      return;
    }

    this.passwordCtrl.markAsTouched();

    if (!this.passwordCtrl.valid) {
      return;
    }

    this.isLoading = true;
    this.responseErrorMsg = null;

    const password = this.passwordCtrl.value;
    this.passwordCtrl.disable();

    this.subscription = this.authService.resetPassword({ newPassword: password, token: this.token! })
      .subscribe({
        next: () => {
          this.notificationsService.showNotification({
            type: NotificationTypes.SUCCESS,
            title: 'Success',
            message: 'Password successfully changed.',
          });

          this.router.navigate([AppRoutes.Auth, AppRoutes.Login]);
        },
        error: (err: HttpErrorResponse) => {
          this.responseErrorMsg = (err.error as IApiErrorResponse).message || 'Unknown error occurred';
          this.passwordCtrl.enable();
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
