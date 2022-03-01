import { IUser } from '../models/user.model';

export function normalizeUserResponse(user: IUser): IUser {
  return {
    ...user,
    fullName: `${ user.firstName } ${ user.lastName }`,
    profilePictureUrl: user.profilePictureUrl || '/assets/img/avatar-placeholder.png',
  };
}
