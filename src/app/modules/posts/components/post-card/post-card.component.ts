import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {

  @Input() public post?: IPost;

  constructor() { }

  ngOnInit(): void {
  }

}
