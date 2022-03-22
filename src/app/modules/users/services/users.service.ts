import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { BaseHttpService } from '@shared/services/base-http.service';
import { AppStateService } from '../../../services/app-state.service';

// models
import { IUser } from '../models/user.model';

// dto
import { UpdateUserDto } from '../models/dto/update-user.dto';

// normalizers
import { normalizeUserResponse } from '../normalizers/user-response.normalizer';
import { convertJsonToFormData } from '@shared/utils/json-to-form-data.helper';

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
        tap(response => this.appStateService.setCurrentUser(response)),
        map(res => normalizeUserResponse(res)),
      );
  }

  public updateUser(payload: UpdateUserDto): Observable<IUser> {
    return this.put<FormData>(this.URL, convertJsonToFormData(payload))
      .pipe(switchMap(() => this.getCurrentUser()));
  }
}
