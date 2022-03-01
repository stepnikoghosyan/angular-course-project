import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

// services
import { CommentsService } from '../../services/comments.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IPost } from '../../models/post.model';
import { IComment } from '../../models/comment.model';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.scss'],
})
export class CommentsDialogComponent implements OnInit, OnDestroy {
  @Input() public post: IPost;

  public comments: IComment[] | null = null;

  public ctrl = new FormControl('', [Validators.required, Validators.minLength(1)]);

  public isLoading = false;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly commentsService: CommentsService,
    private readonly notificationsService: NotificationsService,
  ) {
  }

  ngOnInit(): void {
    this.getCommentsForPost();
  }

  private getCommentsForPost(): void {
    this.comments = null;

    this.commentsService.getComments({ posts: [this.post.id], showAll: true })
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: res => this.comments = res.results,
        error: () => this.comments = [],
      });
  }

  public onSubmit(): void {
    if (this.isLoading) {
      return;
    }

    this.ctrl.markAsTouched();
    this.ctrl.markAsDirty();

    if (!this.ctrl.valid) {
      return;
    }

    this.isLoading = true;

    this.commentsService.create(this.post.id, { message: this.ctrl.value })
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: () => this.handleSuccess(),
        error: (error: HttpErrorResponse) => this.handleError(error),
      });
  }

  private handleSuccess(): void {
    this.ctrl.reset('');
    this.getCommentsForPost();
    this.isLoading = false;
  }

  private handleError(error: HttpErrorResponse): void {
    const message = (error.error as IApiErrorResponse).message || 'Unknown Error Occurred';
    this.notificationsService.showNotification({
      type: NotificationTypes.ERROR,
      title: 'Error',
      message,
    });

    this.isLoading = false;
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
