import { IForgotPasswordFormValue } from '../forms/forgot-password-form-value.model';

export class ForgotPasswordDto {
  email: string;

  constructor(data: IForgotPasswordFormValue) {
    this.email = data.email;
  }
}
