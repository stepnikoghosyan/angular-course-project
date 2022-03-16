import { ILoginFormValue } from '../forms/login-form-value.model';

export class LoginDto {
  email: string;
  password: string;

  constructor(data: ILoginFormValue) {
    this.email = data.email;
    this.password = data.password;
  }
}
