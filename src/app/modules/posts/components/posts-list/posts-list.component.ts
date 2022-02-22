import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

// services
import { PostsService } from '../../services/posts.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IPost } from '../../models/post.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';

@Component({
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public posts: IPost[] = [];

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly postsService: PostsService,
    private readonly notificationsService: NotificationsService,
  ) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    this.postsService.getPosts()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (res) => {
          this.posts = res.results;
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          const message = (err.error as IApiErrorResponse).error || 'Unknown Error Occurred';
          this.notificationsService.showNotification({
            type: NotificationTypes.ERROR,
            message,
          });
        },
      });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
