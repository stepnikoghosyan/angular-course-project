import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { BaseHttpService } from '@shared/services/base-http.service';

// models
import { IPost } from '../models/post.model';
import { IPaginationResponse } from '@shared/models/pagination-response.model';
import { IPostsQueryParams } from '../models/posts-query-params.model';
import { ICreateOrUpdatePostResponse } from '../models/create-post-response.model';
import { IUpdatePostPayload } from '../models/payload/update-post-payload.model';

// dto
import { CreatePostDto } from '../models/dto/create-post.dto';

// helpers
import { convertJsonToFormData } from '@shared/utils/json-to-form-data.helper';

// normalizers
import { normalizePostResponse } from '../normalizers/post-response.normalizer';

@Injectable({ providedIn: 'root' })
export class PostsService extends BaseHttpService<IPost> {
  private readonly URL = 'posts';

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  public getPostById(id: number): Observable<IPost> {
    return this.getById<IPost>(this.URL, id)
      .pipe(
        map(res => normalizePostResponse(res)),
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
    return this.post<FormData, ICreateOrUpdatePostResponse>(this.URL, convertJsonToFormData(payload));
  }

  public updatePost(id: number, payload: IUpdatePostPayload): Observable<ICreateOrUpdatePostResponse> {
    return this.put(`${ this.URL }/${ id }`, payload);
  }

  public deletePost(id: number): Observable<void> {
    return this.deleteById(this.URL, id);
  }
}
