import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';

// services
import { PostsService } from '../../services/posts.service';
import { AppStateService } from '../../../../services/app-state.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { CreatePostDto } from '../../models/dto/create-post.dto';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';
import { ICreateOrUpdatePostResponse } from '../../models/create-post-response.model';
import { AppRoutes } from '@shared/models/app-routes.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';

// validators
import { notOnlySpacesValidator } from '@shared/validators/not-only-spaces.validator';
import { imageMimeTypeValidator } from '../../validators/image-mime-type.validator';
import { fileSizeValidator } from '../../validators/file-size.validator';

// helpers
import { getFullRoute } from '@shared/utils/get-full-route.helper';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.scss'],
})
export class ManagePostComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public isLoading = false;
  public responseErrorMsg: string | null = null;

  public isEditMode = false;

  private currentUserId?: number;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly postsService: PostsService,
    private readonly appStateService: AppStateService,
    private readonly notificationsService: NotificationsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.form = this.initAndGetForm();
  }

  ngOnInit(): void {
    this.subscribeToParams();
  }

  private initAndGetForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      title: ['', [Validators.required, notOnlySpacesValidator]],
      body: ['', [Validators.required, notOnlySpacesValidator]],
      image: [null, [imageMimeTypeValidator(['jpg', 'jpeg', 'png']), fileSizeValidator()]],
    });
  }

  private subscribeToParams(): void {
    this.route.paramMap
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (value) => {
          if (value.has('id')) {
            this.isEditMode = true;
            this.isLoading = true;

            this.appStateService.getCurrentUser()
              .pipe(takeUntil(this.subscriptions$))
              .subscribe(val => {
                this.currentUserId = val?.id;
              });

            this.getPostAndPatchForm(+value.get('id')!);
          }
        },
      });
  }

  private getPostAndPatchForm(id: number): void {
    this.postsService.getPostById(id)
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (response) => {
          if (this.currentUserId !== response.user.id) {
            this.notificationsService.showNotification({
              type: NotificationTypes.ERROR,
              title: 'Error',
              message: 'You don\'t have permissions to edit this post',
            });

            this.router.navigate([getFullRoute(AppRoutes.Posts)], {
              queryParams: {
                userID: this.currentUserId,
              }
            });
            return;
          }

          this.form.patchValue({
            id: response.id,
            title: response.title,
            body: response.body,
            image: response.imageUrl || null,
          });

          this.isLoading = false;
        },
      });
  }

  public onFileChange(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (!!files && files.length > 0) {
      const file = files[0];
      this.form.controls['image'].setValue(file);
      this.form.controls['image'].markAsTouched();
    }
  }

  public clearFileInput(): void {
    this.form.controls['image'].setValue(null);
  }

  public onSubmit(): void {
    if (this.isLoading) {
      console.log('return is loading');
      return;
    }

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('return is not valid');
      return;
    }

    this.isLoading = true;
    this.responseErrorMsg = null;

    const payload = new CreatePostDto(this.form.value);
    this.form.disable();

    let request: Observable<ICreateOrUpdatePostResponse>;

    if (this.isEditMode) {
      request = this.postsService.updatePost(this.form.value.id, payload);
    } else {
      request = this.postsService.createPost(payload);
    }

    request
      .pipe(
        finalize(() => {
          this.form.enable();
          this.isLoading = false;
        }),
        takeUntil(this.subscriptions$),
      )
      .subscribe({
        error: (err: HttpErrorResponse) => {
          console.log('err:', err);
          this.isLoading = false;
          this.responseErrorMsg = (err.error as IApiErrorResponse).message || 'Unknown Error Occurred';
        },
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
