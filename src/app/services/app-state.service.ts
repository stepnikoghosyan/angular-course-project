import { Injectable } from '@angular/core';

// models
import { IUser } from '../modules/users/models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _currentUser = new BehaviorSubject<IUser | null>(null);

  public getCurrentUser(): Observable<IUser | null> {
    return this._currentUser.asObservable();
  }

  public setCurrentUser(value: IUser) {
    this._currentUser.next(value);
  }

  public clear(): void {
    this._currentUser.next(null);
  }
}
