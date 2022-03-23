export interface ICreateOrUpdateCommentResponse {
  id: number;
  message: string;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}
