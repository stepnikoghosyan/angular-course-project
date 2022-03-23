import { IQueryParams } from '@shared/models/query-params.model';

export interface IUsersQueryParams extends IQueryParams {
  excludeSelf?: boolean;
}
