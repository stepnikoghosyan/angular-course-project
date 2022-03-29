// models
import { IPost } from '../models/post.model';

// normalizers
import { normalizeUserResponse } from '../../users/normalizers/user-response.normalizer';

export function normalizePostResponse(post: IPost): IPost {
  return {
    ...post,
    user: normalizeUserResponse(post.user),
    imageUrl: post.imageUrl || null,
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  };
}
