import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../models/post.model';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';
import { AppRoutes } from '@shared/models/app-routes.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';

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
    this.subscribeToQueryParams();
  }

  private subscribeToQueryParams(): void {
    this.route.paramMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe(val => {
        if (val.has('id')) {
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
          console.log('response:', response);
          this.post = response;
        },
        error: (err: HttpErrorResponse) => {
          let message: string;

          if (err.status === 404) {
            message = 'Post you\'re looking for doesn\'t exist!';
          } else {
            message = 'Unknown error occurred';
          }

          this.notificationsService.showNotification({
            type: NotificationTypes.ERROR,
            title: 'Error',
            message,
          });
          this.router.navigate([AppRoutes.Posts]);
        },
      });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
