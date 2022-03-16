export class CreatePostDto {
  title: string;
  body: string;
  image: any;

  constructor(data: any) {
    this.title = data.title;
    this.body = data.body;
    this.image = data.image;
  }
}
