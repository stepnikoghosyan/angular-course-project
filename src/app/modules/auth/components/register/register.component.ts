import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// services
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';

// validators
import { emailValidator } from '../../validators/email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public showPasswordAsText = false;
  public responseErrorMsg: string | null = null;

  public form: FormGroup;

  private subscription: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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

    const values = this.form.value;
    this.form.disable();

    this.subscription = this.authService.register(values)
      .subscribe({
        next: () => {
          this.handleSuccess();
        },
        error: (err: HttpErrorResponse) => {
          this.handleError(err);
        },
      });
  }

  private handleSuccess(): void {
    this.notificationService.showNotification({
      type: NotificationTypes.SUCCESS,
      message: 'New account created',
      title: 'Success',
    });
    this.router.navigate(['/auth/login']);
  }

  private handleError(err: HttpErrorResponse): void {
    this.form.enable();

    const error = err.error as IApiErrorResponse;
    if (err.status === 409) {
      this.form.get('email')?.setErrors({ [error.message]: error.message });
    } else if (error.message) {
      this.responseErrorMsg = error.message;
    } else {
      this.responseErrorMsg = 'Unknown error occurred';
    }

    this.isLoading = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
