import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// services
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { AppRoutes } from '@shared/models/app-routes.model';

// dto
import { ResetPasswordDto } from '../../models/dto/reset-password.dto';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public responseErrorMsg: string | null = null;

  public form: FormGroup;

  private subscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
    this.form = this.initAndGetForm();
  }

  ngOnInit(): void {
    const token = this.route.snapshot.params['resetPasswordToken'];
    if (!token) {
      this.router.navigate([AppRoutes.Auth, AppRoutes.Login]);
    }

    this.form.patchValue({
      token,
    });
  }

  private initAndGetForm(): FormGroup {
    return this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      token: [''],
    });
  }

  public onSubmit(): void {
    if (this.isLoading) {
      return;
    }

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;
    this.responseErrorMsg = null;

    const payloadDto = new ResetPasswordDto(this.form.value);
    this.form.disable();

    this.subscription = this.authService.resetPassword(payloadDto)
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err: HttpErrorResponse) => this.handleError(err),
      });
  }

  private handleSuccess(): void {
    this.notificationsService.showNotification({
      type: NotificationTypes.SUCCESS,
      title: 'Success',
      message: 'Password successfully changed.',
    });

    this.router.navigate([AppRoutes.Auth, AppRoutes.Login]);
  }

  private handleError(err: HttpErrorResponse): void {
    this.responseErrorMsg = (err.error as IApiErrorResponse).message || 'Unknown error occurred';
    this.form.enable();
    this.isLoading = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
