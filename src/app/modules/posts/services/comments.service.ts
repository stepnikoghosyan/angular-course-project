import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// services
import { BaseHttpService } from '@shared/services/base-http.service';

// models
import { IPaginationResponse } from '@shared/models/pagination-response.model';
import { IComment } from '../models/comment.model';
import { ICommentsQueryParams } from '../models/comments-query-params.model';
import { ICreateOrUpdateCommentPayload } from '../models/payload/create-or-update-comment-payload.model';
import { ICreateOrUpdateCommentResponse } from '../models/create-or-update-comment-response.model';
import { map } from 'rxjs/operators';
import { normalizeCommentResponse } from '../normalizers/comment-response.normalizer';

@Injectable({ providedIn: 'root' })
export class CommentsService extends BaseHttpService<IComment> {
  private readonly URL = 'comments';

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  public getComments(params?: ICommentsQueryParams): Observable<IPaginationResponse<IComment>> {
    return this.getByPagination<IComment>(this.URL, params)
      .pipe(
        map(response => {
          return {
            count: response.count,
            results: response.results.map(comment => normalizeCommentResponse(comment)),
          };
        }),
      );
  }

  public create(postId: number, data: ICreateOrUpdateCommentPayload): Observable<ICreateOrUpdateCommentResponse> {
    return this.post<ICreateOrUpdateCommentPayload, ICreateOrUpdateCommentResponse>(`${ this.URL }/${ postId }`, data);
  }

  public update(postId: number, data: ICreateOrUpdateCommentPayload): Observable<ICreateOrUpdateCommentResponse> {
    return this.put<ICreateOrUpdateCommentPayload, ICreateOrUpdateCommentResponse>(`${ this.URL }/${ postId }`, data);
  }

  public deleteComment(id: number): Observable<void> {
    return this.deleteById(this.URL, id);
  }
}
