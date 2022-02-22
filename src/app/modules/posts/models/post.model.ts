import { IUser } from '../../users/models/user.model';

export interface IPost {
  id: number;
  title: string;
  body: string;
  comments: Array<any>; // TODO: update
  imageUrl: string | null;
  user: IUser;
}
