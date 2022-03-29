import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { BaseHttpService } from '@shared/services/base-http.service';
import { NotificationsService } from '@shared/modules/notifications/services/notifications.service';

// models
import { IPost } from '../models/post.model';
import { IPaginationResponse } from '@shared/models/pagination-response.model';
import { IPostsQueryParams } from '../models/posts-query-params.model';
import { ICreateOrUpdatePostResponse } from '../models/create-post-response.model';
import { IUpdatePostPayload } from '../models/payload/update-post-payload.model';
import { NotificationTypes } from '@shared/modules/notifications/models/notification-types.model';
import { AppRoutes } from '@shared/models/app-routes.model';
import { IApiErrorResponse } from '@shared/models/api-error-response.model';

// dto
import { CreatePostDto } from '../models/dto/create-post.dto';

// helpers
import { convertJsonToFormData } from '@shared/utils/json-to-form-data.helper';
import { getFullRoute } from '@shared/utils/get-full-route.helper';

// normalizers
import { normalizePostResponse } from '../normalizers/post-response.normalizer';

@Injectable({ providedIn: 'root' })
export class PostsService extends BaseHttpService<IPost> {
  private readonly URL = 'posts';

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly router: Router,
    http: HttpClient,
  ) {
    super(http);
  }

  public getPostById(id: number): Observable<IPost> {
    return this.getById<IPost>(this.URL, id)
      .pipe(
        map(res => normalizePostResponse(res)),
        catchError((err: HttpErrorResponse) => {
          let message = 'Unknown error occurred';

          if (err.status === 404) {
            message = 'Post you\'re looking for doesn\'t exist!';
          }

          this.notificationsService.showNotification({
            type: NotificationTypes.ERROR,
            title: 'Error',
            message,
          });
          this.router.navigate([AppRoutes.Posts]);

          return EMPTY;
        }),
      );
  }

  public getPosts(params?: IPostsQueryParams): Observable<IPaginationResponse<IPost>> {
    return this.get<IPaginationResponse<IPost>>(this.URL, params)
      .pipe(
        map(res => {
          return {
            count: res.count,
            results: res.results.map(post => normalizePostResponse(post)),
          };
        }),
      );
  }

  public createPost(payload: CreatePostDto): Observable<ICreateOrUpdatePostResponse> {
    return this.post<FormData, ICreateOrUpdatePostResponse>(this.URL, convertJsonToFormData(payload))
      .pipe(
        tap(() => {
          this.notificationsService.showNotification({
            type: NotificationTypes.SUCCESS,
            title: 'Success',
            message: 'Post created!',
          });
          this.router.navigate([getFullRoute(AppRoutes.Posts)]);
        }),
      );
  }

  public updatePost(id: number, payload: IUpdatePostPayload): Observable<ICreateOrUpdatePostResponse> {
    return this.put<FormData, ICreateOrUpdatePostResponse>(`${ this.URL }/${ id }`, convertJsonToFormData(payload))
      .pipe(
        tap(() => {
          this.notificationsService.showNotification({
            type: NotificationTypes.SUCCESS,
            title: 'Success',
            message: 'Post updated!',
          });
          this.router.navigate([getFullRoute(AppRoutes.Posts)]);
        }),
        catchError((err: HttpErrorResponse) => {
          let message = 'Unknown Error Occurred' || (err.error as IApiErrorResponse).message;

          if (err.status === 404) {
            message = 'Post you\'re looking for doesn\'t exist!';
          }

          this.notificationsService.showNotification({
            type: NotificationTypes.ERROR,
            title: 'Error',
            message,
          });
          this.router.navigate([AppRoutes.Posts]);

          return throwError(() => err);
        }),
      );
  }

  public deletePost(id: number): Observable<void> {
    return this.deleteById(this.URL, id);
  }
}
