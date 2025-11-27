'use client';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from '../ui/Pagination';
import { User } from '@/types/user';
import Table from '../ui/Table';
import { formatUserAddress } from '@/utils';

interface UsersTableProps {
  usersCount: number | undefined;
  usersData: User[] | undefined;
  isLoading: boolean;
  onRowClick: (i: number) => void;
  DEFAULT_PAGE_LIMIT: number;
}

const tableHead: { name: keyof User; displayName: string }[] = [
  { name: 'name', displayName: 'Full name' },
  { name: 'email', displayName: 'Email address' },
  { name: 'address', displayName: 'Address' },
];

export function UsersTable({
  usersCount,
  usersData,
  isLoading,
  onRowClick,
  DEFAULT_PAGE_LIMIT,
}: UsersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = searchParams.get('page') ?? '1';
  const page = Number(pageParam);

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className='space-y-10'>
      <Table<User>
        fields={tableHead}
        isLoading={isLoading}
        onRowClick={onRowClick}
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
        totalPages={Math.ceil((usersCount || 0) / DEFAULT_PAGE_LIMIT)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
