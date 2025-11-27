'use client';
import { DEFAULT_PAGE_LIMIT } from '@/constants';
import { EQueryKey } from '@/constants/query-keys';
import { fetchUsersAPI, fetchUsersCountAPI } from '@/services/users/query';
import { User } from '@/types/user';
import { formatUserAddress } from '@/utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import Pagination from './ui/Pagination';
import Table from './ui/Table';

const tableHead: { name: keyof User; displayName: string }[] = [
  { name: 'name', displayName: 'Full name' },
  { name: 'email', displayName: 'Email address' },
  { name: 'address', displayName: 'Address' },
];

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

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handleRowClick = (i: number) => {
    router.push(`/users/${data?.[i].id}/posts?page=${page}`);
  };

  return (
    <div>
      <h1 className='text-[40px] sm:text-[60px] mb-10 font-medium text-dark-500'>
        Users
      </h1>
      <div className='space-y-10'>
        <Table<User>
          fields={tableHead}
          isLoading={isLoading}
          onRowClick={handleRowClick}
          tableData={data || []}
          builder={(field, data) => {
            switch (field.name) {
              case 'address':
                return (
                  <p className='max-w-[392px] truncate'>
                    {formatUserAddress(data)}
                  </p>
                );
              default:
                return data[field.name];
            }
          }}
        />
        <Pagination
          currentPage={page}
          totalPages={Math.ceil((usersCount?.count || 0) / DEFAULT_PAGE_LIMIT)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Users;
