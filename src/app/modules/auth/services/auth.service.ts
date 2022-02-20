import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// services
import { BaseHttpService } from '@shared/services/base-http.service';

@Injectable()
export class AuthService extends BaseHttpService<any> {
  constructor(
    http: HttpClient,
  ) {
    super(http);
  }
}
