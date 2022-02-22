import { IUser } from '../models/user.model';

export function normalizeUserResponse(user: IUser) {
  return {
    ...user,
    fullName: `${ user.firstName } ${ user.lastName }`,
  };
}
