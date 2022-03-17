import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// models
import { IPost } from '../../../../../modules/posts/models/post.model';
import { AppRoutes } from '@shared/models/app-routes.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {

  @Input() public post?: IPost;

  public readonly APP_ROUTES = AppRoutes;
}
