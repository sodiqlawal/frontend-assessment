import api from '../api';

export const createPostAPI = async (payload: {
  userId: string;
  title: string;
  body: string;
}) => {
  const { data } = await api.post(`/posts`, payload);
  return data;
};

export const deletePostAPI = async (id: string) => {
  const { data } = await api.delete(`/posts/${id}`);
  return data;
};
