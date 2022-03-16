import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// services
import { AuthService } from '../../services/auth.service';

// models
import { HttpErrorResponse } from '@angular/common/http';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';

// dto
import { LoginDto } from '../../models/dto/login.dto';

// validators
import { emailValidator } from '../../validators/email.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {

  public isLoading = false;
  public responseErrorMsg: string | null = null;

  public form: FormGroup;

  private subscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.form = this.initAndGetForm();
  }

  private initAndGetForm(): FormGroup {
    return this.formBuilder.group({
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

    this.form.disable();

    this.subscription = this.authService.login(new LoginDto(this.form.value), this.form.value.rememberMe)
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
