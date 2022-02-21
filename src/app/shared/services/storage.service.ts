import { Injectable } from '@angular/core';

// models
import { ITokensResponse } from '../../modules/auth/models/tokens-response.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  public getAccessToken(): string {
    const token = localStorage.getItem('accessToken');
    return token || '';
  }

  public getRefreshToken(): string {
    const token = localStorage.getItem('refreshToken');
    return token || '';
  }

  public setTokens(tokens: ITokensResponse): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  public clear(): void {
    localStorage.clear();
  }
}
