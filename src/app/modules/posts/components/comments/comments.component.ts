import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { Subject, finalize, takeUntil } from 'rxjs';

// services
import { CommentsService } from '../../services/comments.service';
import { AppStateService } from '../../../../services/app-state.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IPost } from '../../models/post.model';
import { IComment } from '../../models/comment.model';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';

// dto
import { ManageCommentDto } from '../../models/dto/manage-comment.dto';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() public post!: IPost;

  public comments: IComment[] = [];

  public ctrl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  public loaders = {
    isAddingComment: false,
    isGettingComments: true,
  };

  public currentUserId: number | null = null;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly commentsService: CommentsService,
    private readonly notificationsService: NotificationsService,
    private readonly appStateService: AppStateService,
  ) {
    this.currentUserId = this.appStateService.currentUser!.id;
  }

  ngOnInit(): void {
    this.getCommentsForPost();
  }

  private getCommentsForPost(): void {
    this.loaders.isGettingComments = true;

    this.commentsService.getComments({ posts: [this.post.id], showAll: true })
      .pipe(
        finalize(() => this.loaders.isGettingComments = false),
        takeUntil(this.subscriptions$),
      )
      .subscribe({
        next: res => this.comments = res.results,
        error: () => this.comments = [],
      });
  }

  public trackBy(index: number, item: IComment): number {
    return item.id;
  }

  public onSubmit(): void {
    if (this.loaders.isAddingComment) {
      return;
    }

    this.ctrl.markAsTouched();
    this.ctrl.markAsDirty();

    if (!this.ctrl.valid) {
      return;
    }

    this.loaders.isAddingComment = true;
    this.ctrl.disable();

    this.commentsService.create(this.post.id, new ManageCommentDto(this.ctrl.value))
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: () => this.handleSuccess(),
        error: (error: HttpErrorResponse) => this.handleError(error),
      });
  }

  private handleSuccess(): void {
    this.ctrl.reset('');
    this.ctrl.enable();
    this.getCommentsForPost();
    this.loaders.isAddingComment = false;
  }

  private handleError(error: HttpErrorResponse): void {
    const message = (error.error as IApiErrorResponse).message || 'Unknown Error Occurred';
    this.notificationsService.showNotification({
      type: NotificationTypes.ERROR,
      title: 'Error',
      message,
    });

    this.ctrl.enable();
    this.loaders.isAddingComment = false;
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
