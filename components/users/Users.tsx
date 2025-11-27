'use client';
import { DEFAULT_PAGE_LIMIT } from '@/constants';
import { EQueryKey } from '@/constants/query-keys';
import { fetchUsersCountAPI } from '@/services/users/query';
import { useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import Loader from '../ui/Loader';
import { UsersTable } from './UsersTable';

const Users = () => {
  const { data: usersCount } = useQuery({
    queryKey: [EQueryKey.user_count],
    queryFn: () => fetchUsersCountAPI(),
  });

  return (
    <div>
      <h1 className='text-[40px] sm:text-[60px] mb-10 font-medium text-dark-500'>
        Users
      </h1>
      <Suspense fallback={<Loader />}>
        <UsersTable
          usersCount={usersCount?.count || 0}
          DEFAULT_PAGE_LIMIT={DEFAULT_PAGE_LIMIT}
        />
      </Suspense>
    </div>
  );
};

export default Users;
