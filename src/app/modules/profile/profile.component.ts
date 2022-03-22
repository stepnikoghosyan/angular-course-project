import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, Subject, takeUntil } from 'rxjs';

// services
import { UsersService } from '../users/services/users.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// validators
import { imageMimeTypeValidator } from '../posts/validators/image-mime-type.validator';
import { fileSizeValidator } from '../posts/validators/file-size.validator';
import { notOnlySpacesValidator } from '@shared/validators/not-only-spaces.validator';
import { emailValidator } from '../auth/validators/email.validator';
import { mustMatchValidator } from './validators/must-match.validator';

// models
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';

// dto
import { UpdateUserDto } from '../users/models/dto/update-user.dto';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public isLoading = true;

  public responseErrorMsg: string | null = null;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly usersService: UsersService,
    private readonly notificationsService: NotificationsService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.initAndGetForm();
  }

  ngOnInit() {
    this.getDataAndPatchForm();
  }

  private getDataAndPatchForm(): void {
    this.usersService.getCurrentUser()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (response) => {
          this.form.patchValue({
            image: response.profilePictureUrl,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
          });

          this.isLoading = false;
        },
      });
  }

  private initAndGetForm(): FormGroup {
    return this.formBuilder.group({
      image: ['', [imageMimeTypeValidator(['jpg', 'jpeg', 'png']), fileSizeValidator(1024 * 1024)]], // 1 MB
      firstName: ['', [Validators.required, notOnlySpacesValidator]],
      lastName: ['', [Validators.required, notOnlySpacesValidator]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: [mustMatchValidator('password', 'confirmPassword', 'Password', 'Confirm Password')],
    });
  }

  public onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!!files && files.length > 0) {
      const file = files[0];
      this.form.controls['image'].setValue(file);
      this.form.controls['image'].markAsTouched();
    }
  }

  public clearFileInput(fileInput: HTMLInputElement): void {
    fileInput.value = '';
    this.form.controls['image'].setValue(null);
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

    this.usersService.updateUser(new UpdateUserDto(this.form.value))
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.subscriptions$),
      )
      .subscribe({
        next: () => {
          this.notificationsService.showNotification({
            type: NotificationTypes.SUCCESS,
            title: 'Success',
            message: 'Profile data updated',
          });

          this.form.patchValue({
            password: '',
            confirmPassword: '',
          });

          this.form.markAsUntouched();
        },
        error: (err: HttpErrorResponse) => {
          this.responseErrorMsg = (err.error as IApiErrorResponse).message || 'Unknown error occurred';
        },
      });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
