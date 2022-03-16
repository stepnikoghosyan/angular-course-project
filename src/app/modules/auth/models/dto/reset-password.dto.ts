import { IResetPasswordFormValue } from '../forms/reset-password-form-value.model';

export class ResetPasswordDto {
  newPassword: string;
  token: string;

  constructor(data: IResetPasswordFormValue) {
    this.newPassword = data.newPassword;
    this.token = data.token;
  }
}
