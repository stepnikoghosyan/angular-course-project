import { IComment } from '../models/comment.model';
import { normalizeUserResponse } from '../../users/normalizers/user-response.normalizer';

export function normalizeCommentResponse(comment: IComment): IComment {
  return {
    ...comment,
    user: normalizeUserResponse(comment.user),
  };
}
