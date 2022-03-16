import { Injectable } from '@angular/core';

// models
import { IUser } from '../modules/users/models/user.model';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  public currentUser: IUser | null = null;

  public clear(): void {
    this.currentUser = null;
  }
}
