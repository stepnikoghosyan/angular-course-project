import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// services
import { PostsService } from '../../services/posts.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IPost } from '../../models/post.model';
import { AppRoutes } from '@shared/models/app-routes.model';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit, OnDestroy {

  public post?: IPost;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly postsService: PostsService,
    private readonly notificationsService: NotificationsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.subscribeToParams();
  }

  private subscribeToParams(): void {
    this.route.paramMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(val => {
        if (val.has('id') && +val.get('id')! > 0) {
          this.getPost(+val.get('id')!);
        } else {
          this.router.navigate([AppRoutes.Posts]);
        }
      });
  }

  private getPost(id: number): void {
    this.postsService.getPostById(id)
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (response) => {
          this.post = response;
        },
      });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
