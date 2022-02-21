import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// services
import { BaseHttpService } from '@shared/services/base-http.service';
import { AppStateService } from '../../../services/app-state.service';

// models
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService extends BaseHttpService<IUser> {
  private readonly URL = 'users';

  constructor(
    private readonly appStateService: AppStateService,
    http: HttpClient,
  ) {
    super(http);
  }

  public getCurrentUser(): Observable<IUser> {
    return this.get<IUser>(`${ this.URL }/my-profile`)
      .pipe(
        tap(response => this.appStateService.currentUser = response),
      );
  }
}
