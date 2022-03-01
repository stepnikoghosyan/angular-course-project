import { IUser } from '../../users/models/user.model';

export interface IComment {
  id: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
