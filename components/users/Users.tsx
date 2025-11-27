'use client';
import { DEFAULT_PAGE_LIMIT } from '@/constants';
import { EQueryKey } from '@/constants/query-keys';
import { fetchUsersAPI, fetchUsersCountAPI } from '@/services/users/query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Loader from '../ui/Loader';
import { UsersTable } from './UsersTable';

const Users = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get('page') ?? '1';
  const page = Number(pageParam);

  const { data: usersCount } = useQuery({
    queryKey: [EQueryKey.user_count],
    queryFn: () => fetchUsersCountAPI(),
  });

  const { data, isLoading } = useQuery({
    queryKey: [EQueryKey.users, page],
    queryFn: () =>
      fetchUsersAPI({ pageNumber: page - 1, pageSize: DEFAULT_PAGE_LIMIT }),
    placeholderData: keepPreviousData,
  });

  const handleRowClick = (i: number) => {
    router.push(`/users/${data?.[i].id}/posts?page=${page}`);
  };

  return (
    <div>
      <h1 className='text-[40px] sm:text-[60px] mb-10 font-medium text-dark-500'>
        Users
      </h1>
      <Suspense fallback={<Loader />}>
        <UsersTable
          usersCount={usersCount?.count || 0}
          usersData={data}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          DEFAULT_PAGE_LIMIT={DEFAULT_PAGE_LIMIT}
        />
      </Suspense>
    </div>
  );
};

export default Users;
