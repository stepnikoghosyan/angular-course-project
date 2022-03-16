import { IRegisterFormValue } from '../forms/register-form-value.model';

export class RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(data: IRegisterFormValue) {
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}
