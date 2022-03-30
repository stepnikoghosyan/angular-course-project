import { IUser } from '../../users/models/user.model';
import { IComment } from '../../comments/models/comment.model';

export interface IPost {
  id: number;
  title: string;
  body: string;
  comments: Array<IComment>;
  imageUrl: string | null;
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}
