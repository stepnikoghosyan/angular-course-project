import { IUpdateUserFormValue } from '../forms/update-user-form-value.model';

export class UpdateUserDto {
  profilePicture?: File;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(data: IUpdateUserFormValue) {
    if (!!data.image && data.image instanceof File) {
      this.profilePicture = data.image;
    }

    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
  }
}
