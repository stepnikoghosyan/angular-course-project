import { ICreatePostFormValue } from '../forms/create-post-form-value.model';

export class CreatePostDto {
  title: string;
  body: string;
  image: File;

  constructor(data: ICreatePostFormValue) {
    this.title = data.title;
    this.body = data.body;
    this.image = data.image;
  }
}
