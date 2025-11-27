import { Post } from '@/types/post';
import api from '../api';

export const fetchPostsAPI = async (params: { userId: string }) => {
  const { data } = await api.get<Post[]>(`/posts`, {
    params: params || {},
  });
  return data;
};
