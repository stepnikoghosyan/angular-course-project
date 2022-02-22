export interface ICreateOrUpdatePostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
  imageId: number | null;
  createdAt: Date;
  updatedAt: Date;
}
