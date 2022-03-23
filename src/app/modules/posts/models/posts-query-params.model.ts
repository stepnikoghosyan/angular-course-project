import { IQueryParams } from '@shared/models/query-params.model';

export interface IPostsQueryParams extends IQueryParams {
  userID?: number;
  title?: string;
}
