import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// services
import { AuthService } from '../../services/auth.service';

// models
import { HttpErrorResponse } from '@angular/common/http';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';

// validators
import { emailValidator } from '../../validators/email.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public showPasswordAsText = false;
  public responseErrorMsg: string | null = null;

  public form: FormGroup;

  private subscription: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required]],
      rememberMe: [false],
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

    this.subscription = this.authService.login({
      email: values.email,
      password: values.password,
    }, values.rememberMe)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          this.responseErrorMsg = (err.error as IApiErrorResponse).message || 'Unknown error occurred';
          this.form.enable();
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
