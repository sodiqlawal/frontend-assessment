import { EQueryKey } from '@/constants/query-keys';
import { QueryFilters, useQueryClient } from '@tanstack/react-query';

export default function useMyQueryClient<T extends unknown>(key: EQueryKey) {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<T>([key]);

  const invalidateQueries = () => {
    queryClient.invalidateQueries([key] as QueryFilters<readonly unknown[]>)
  }

  return {
    data,
    invalidateQueries,
  };
}
