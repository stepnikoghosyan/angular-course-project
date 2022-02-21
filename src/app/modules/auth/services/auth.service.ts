import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// services
import { BaseHttpService } from '@shared/services/base-http.service';

// models
import { ITokensResponse } from '../models/tokens-response.model';
import { ILoginPayload } from '../models/payload/login-payload.model';
import { IRegisterPayload } from '../models/payload/register-payload.model';
import { IRefreshTokensPayload } from '../models/payload/refresh-tokens-payload.model';
import { IForgotPasswordPayload } from '../models/payload/forgot-password-payload.model';
import { IResetPasswordPayload } from '../models/payload/reset-password-payload.model';
import { IVerifyAccountQueryParams } from '../models/verify-account-query-params.model';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService<any> {
  private readonly URL = 'auth';

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  public login(payload: ILoginPayload): Observable<ITokensResponse> {
    return this.post<ILoginPayload, ITokensResponse>(`${ this.URL }/login`, payload);
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
}
