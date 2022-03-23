import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';

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

  @Input() public queryParams: IPostsQueryParams = {
    showAll: true,
  };

  @Input() public listenForQueryParamsChange = true;

  public isLoading = true;
  public posts: IPost[] = [];

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly postsService: PostsService,
    private readonly notificationsService: NotificationsService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.listenForQueryParamsChange) {
      this.subscribeToQueryParams();
    } else {
      this.getPosts();
    }
  }

  private getPosts(): void {
    this.isLoading = true;
    this.posts = [];

    this.postsService.getPosts(this.queryParams)
      .pipe(
        finalize(() => this.isLoading = false),
        takeUntil(this.subscriptions$),
      )
      .subscribe({
        next: (res) => {
          this.posts = res.results;
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

  private subscribeToQueryParams(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (value) => {
          this.queryParams = {
            userID: value.has('userID') && +value.get('userID')! || undefined,
            title: value.get('title') || undefined,
            // page: value.has('page') && +value.get('page')! || undefined, // TODO: for later pagination
            // pageSize: value.has('pageSize') && +value.get('pageSize')! || undefined, // TODO: for later pagination
            // showAll: value.has('showAll') && value.get('showAll') === 'true', // TODO: for later pagination
            showAll: true,
          };

          this.getPosts();
        },
      });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
