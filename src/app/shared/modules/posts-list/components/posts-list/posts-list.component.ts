import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

// services
import { PostsService } from '../../../../../modules/posts/services/posts.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IPost } from '../../../../../modules/posts/models/post.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { IPostsQueryParams } from '../../../../../modules/posts/models/posts-query-params.model';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit, OnDestroy {

  @Input() public staticSizeConfig?: IPostsQueryParams;

  public isLoading = true;
  public posts: IPost[] = [];

  public queryParams: IPostsQueryParams = {
    page: 1,
    pageSize: 10,
    showAll: false,
  };

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly postsService: PostsService,
    private readonly notificationsService: NotificationsService,
  ) {
  }

  ngOnInit(): void {
    if (!!this.staticSizeConfig) {
      this.queryParams = this.staticSizeConfig;
    }

    this.getPosts();
  }

  private getPosts(): void {
    this.postsService.getPosts(this.queryParams)
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
