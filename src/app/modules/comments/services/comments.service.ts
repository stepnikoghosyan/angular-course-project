import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { BaseHttpService } from '@shared/services/base-http.service';

// models
import { IPaginationResponse } from '@shared/models/pagination-response.model';
import { IComment } from '../models/comment.model';
import { ICommentsQueryParams } from '../models/comments-query-params.model';
import { ICreateOrUpdateCommentResponse } from '../models/create-or-update-comment-response.model';

// dto
import { ManageCommentDto } from '../models/dto/manage-comment.dto';

// normalizers
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

  public create(postId: number, data: ManageCommentDto): Observable<ICreateOrUpdateCommentResponse> {
    return this.post<ManageCommentDto, ICreateOrUpdateCommentResponse>(`${ this.URL }/${ postId }`, data);
  }

  public update(postId: number, data: ManageCommentDto): Observable<ICreateOrUpdateCommentResponse> {
    return this.put<ManageCommentDto, ICreateOrUpdateCommentResponse>(`${ this.URL }/${ postId }`, data);
  }

  public deleteComment(id: number): Observable<void> {
    return this.deleteById(this.URL, id);
  }
}
