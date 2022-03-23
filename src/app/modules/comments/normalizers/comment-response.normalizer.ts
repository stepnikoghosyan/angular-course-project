// models
import { IComment } from '../models/comment.model';

// normalizers
import { normalizeUserResponse } from '../../users/normalizers/user-response.normalizer';

export function normalizeCommentResponse(comment: IComment): IComment {
  return {
    ...comment,
    createdAt: new Date(comment.createdAt),
    updatedAt: new Date(comment.updatedAt),
    user: normalizeUserResponse(comment.user),
  };
}
