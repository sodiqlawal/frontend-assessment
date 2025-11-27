'use client';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from '../ui/Pagination';
import { User } from '@/types/user';
import Table from '../ui/Table';
import { formatUserAddress } from '@/utils';
import { fetchUsersAPI } from '@/services/users/query';
import { EQueryKey } from '@/constants/query-keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const tableHead: { name: keyof User; displayName: string }[] = [
  { name: 'name', displayName: 'Full name' },
  { name: 'email', displayName: 'Email address' },
  { name: 'address', displayName: 'Address' },
];
interface UsersTableProps {
  usersCount: number;
  DEFAULT_PAGE_LIMIT: number;
}

export function UsersTable({
  usersCount,
  DEFAULT_PAGE_LIMIT,
}: UsersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get('page') ?? '1';
  const page = Number(pageParam);

  const { data: usersData, isLoading } = useQuery({
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

  const handleRowClick = useCallback(
    (i: number) => {
      router.push(`/users/${usersData?.[i].id}/posts?page=${page}`);
    },
    [router, usersData, page]
  );

  return (
    <div className='space-y-10'>
      <Table<User>
        fields={tableHead}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        tableData={usersData || []}
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
        totalPages={Math.ceil(usersCount / DEFAULT_PAGE_LIMIT)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
