import api from '../api';
import { User } from '@/types/user';

export const fetchUsersAPI = async (params: {
  pageNumber: number;
  pageSize: number;
}) => {
  const { data } = await api.get<User[]>(`/users`, {
    params,
  });
  return data;
};

export const fetchUsersCountAPI = async () => {
  const { data } = await api.get<{ count: number }>(`/users/count`);
  return data;
};
