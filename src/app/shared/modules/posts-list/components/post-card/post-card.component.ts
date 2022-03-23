import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// services
import { AppStateService } from '../../../../../services/app-state.service';

// models
import { IPost } from '../../../../../modules/posts/models/post.model';
import { AppRoutes } from '@shared/models/app-routes.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent implements OnInit, OnDestroy {

  @Input() public post?: IPost;
  public currentUserId?: number;

  public readonly APP_ROUTES = AppRoutes;

  private subscription?: Subscription;

  constructor(
    private readonly appStateService: AppStateService,
  ) {
  }

  ngOnInit() {
    this.subscription = this.appStateService.getCurrentUser()
      .subscribe({
        next: (val) => {
          this.currentUserId = val?.id;
        },
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
