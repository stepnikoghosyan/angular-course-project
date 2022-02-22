import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, switchMap, take, tap } from 'rxjs';

// services
import { BaseHttpService } from '@shared/services/base-http.service';
import { UsersService } from '../../users/services/users.service';
import { AppStateService } from '../../../services/app-state.service';
import { StorageService } from '@shared/services/storage.service';

// models
import { ITokensResponse } from '../models/tokens-response.model';
import { ILoginPayload } from '../models/payload/login-payload.model';
import { IRegisterPayload } from '../models/payload/register-payload.model';
import { IRefreshTokensPayload } from '../models/payload/refresh-tokens-payload.model';
import { IForgotPasswordPayload } from '../models/payload/forgot-password-payload.model';
import { IResetPasswordPayload } from '../models/payload/reset-password-payload.model';
import { IVerifyAccountQueryParams } from '../models/verify-account-query-params.model';
import { IResendActivationTokenPayload } from '../models/payload/resend-activation-token-payload.model';
import { IUser } from '../../users/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService<any> {
  private readonly URL = 'auth';

  constructor(
    private readonly usersService: UsersService,
    private readonly appStateService: AppStateService,
    private readonly storageService: StorageService,
    private readonly router: Router,
    http: HttpClient,
  ) {
    super(http);
  }

  public login(payload: ILoginPayload, rememberMe = true): Observable<IUser> {
    if (rememberMe) {
      this.storageService.setStorageType('localStorage');
    } else {
      this.storageService.setStorageType('sessionStorage');
    }

    return this.post<ILoginPayload, ITokensResponse>(`${ this.URL }/login`, payload)
      .pipe(
        tap((res) => this.storageService.setTokens(res)),
        switchMap(() => this.usersService.getCurrentUser()),
      );
  }

  public register(payload: IRegisterPayload): Observable<void> {
    return this.post<IRegisterPayload, void>(`${ this.URL }/register`, payload);
  }

  public refreshTokens(refreshToken: string): Observable<ITokensResponse> {
    return this.post<IRefreshTokensPayload, ITokensResponse>(`${ this.URL }/refresh-tokens`, { refreshToken } as IRefreshTokensPayload);
  }

  public forgotPassword(email: string): Observable<void> {
    return this.post<IForgotPasswordPayload, void>(`${ this.URL }/forgot-password`, { email } as IForgotPasswordPayload);
  }

  public resetPassword(payload: IResetPasswordPayload): Observable<void> {
    return this.post<IResetPasswordPayload, void>(`${ this.URL }/reset-password`, payload);
  }

  public verifyAccount(activationToken: string): Observable<void> {
    return this.get(`${ this.URL }/verify-account`, { activationToken } as IVerifyAccountQueryParams);
  }

  public resendActivationToken(email: string): Observable<void> {
    return this.post<IResendActivationTokenPayload, void>(`${ this.URL }/resend-activation-token`, { email } as IResendActivationTokenPayload);
  }

  public get isAuthenticated(): boolean {
    return !!this.storageService.getAccessToken();
  }

  public initAppAndCheckCurrentLoggedInUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isAuthenticated) {
        resolve();
        return;
      }

      this.usersService.getCurrentUser()
        .pipe(take(1))
        .subscribe({
          next: () => {
            resolve();
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              resolve();
            } else {
              reject(err);
            }
          },
        });
    });
  }

  public logout(): void {
    this.storageService.clear();
    this.appStateService.clear();
    this.router.navigate(['/auth/login']);
  }
}
