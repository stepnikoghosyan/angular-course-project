import { IQueryParams } from '@shared/models/query-params.model';

export interface IVerifyAccountQueryParams extends IQueryParams {
  activationToken: string;
}
