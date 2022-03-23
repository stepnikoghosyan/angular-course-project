import { IQueryParams } from '@shared/models/query-params.model';

export interface ICommentsQueryParams extends IQueryParams {
  posts: number[];
}
