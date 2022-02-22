import { Component, Input, OnInit } from '@angular/core';

// models
import { IPost } from '../../models/post.model';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.scss'],
})
export class CommentsDialogComponent implements OnInit {

  @Input() public readonly post: IPost;

  constructor() {
  }

  ngOnInit(): void {
  }

}
