import { ChangeDetectionStrategy, Component } from '@angular/core';

// models
import { AppRoutes } from '@shared/models/app-routes.model';

// helpers
import { getFullRoute } from '@shared/utils/get-full-route.helper';

@Component({
  selector: 'app-posts-filter',
  templateUrl: './posts-filter.component.html',
  styleUrls: ['./posts-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsFilterComponent {
  public createPostRoute = getFullRoute(AppRoutes.CreatePost);
}
