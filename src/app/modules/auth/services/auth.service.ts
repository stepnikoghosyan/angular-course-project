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
import { IRefreshTokensPayload } from '../models/payload/refresh-tokens-payload.model';
import { IVerifyAccountQueryParams } from '../models/verify-account-query-params.model';
import { IUser } from '../../users/models/user.model';

// dto
import { ResetPasswordDto } from '../models/dto/reset-password.dto';
import { ForgotPasswordDto } from '../models/dto/forgot-password.dto';
import { LoginDto } from '../models/dto/login.dto';
import { RegisterDto } from '../models/dto/register.dto';
import { ResendActivationTokenDto } from '../models/dto/resend-activation-token.dto';

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

  public login(payload: LoginDto, rememberMe = true): Observable<IUser> {
    if (rememberMe) {
      this.storageService.setStorageType('localStorage');
    } else {
      this.storageService.setStorageType('sessionStorage');
    }

    return this.post<LoginDto, ITokensResponse>(`${ this.URL }/login`, payload)
      .pipe(
        tap((res) => this.storageService.setTokens(res)),
        switchMap(() => this.usersService.getCurrentUser()),
      );
  }

  public register(payload: RegisterDto): Observable<void> {
    return this.post<RegisterDto, void>(`${ this.URL }/register`, payload);
  }

  public refreshTokens(refreshToken: string): Observable<ITokensResponse> {
    return this.post<IRefreshTokensPayload, ITokensResponse>(`${ this.URL }/refresh-tokens`, { refreshToken } as IRefreshTokensPayload);
  }

  public forgotPassword(payload: ForgotPasswordDto): Observable<void> {
    return this.post<ForgotPasswordDto, void>(`${ this.URL }/forgot-password`, payload);
  }

  public resetPassword(payload: ResetPasswordDto): Observable<void> {
    return this.post<ResetPasswordDto, void>(`${ this.URL }/reset-password`, payload);
  }

  public verifyAccount(activationToken: string): Observable<void> {
    return this.get(`${ this.URL }/verify-account`, { activationToken } as IVerifyAccountQueryParams);
  }

  public resendActivationToken(data: ResendActivationTokenDto): Observable<void> {
    return this.post<ResendActivationTokenDto, void>(`${ this.URL }/resend-activation-token`, data);
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
