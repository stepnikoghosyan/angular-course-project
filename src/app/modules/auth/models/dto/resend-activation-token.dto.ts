import { IResendActivationTokenFormValue } from '../forms/resend-activation-token-form-value.model';

export class ResendActivationTokenDto {
  email: string;

  constructor(data: IResendActivationTokenFormValue) {
    this.email = data.email;
  }
}
