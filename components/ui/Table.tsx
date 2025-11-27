import React from 'react';
import Loader from './Loader';
import { cn } from '@/utils';

export interface TableField<T> {
  name: keyof T;
  displayName?: string;
}

export interface tableData<T> {
  items: T[];
}

export type FieldBuilder<T, D> = (
  field: TableField<T>,
  data: D,
  row: number,
  column: number
) => React.ReactNode;

export interface TableProps<T, D> {
  fields: TableField<T>[];
  tableData: D[];
  noDataMessage?: string;
  builder: FieldBuilder<T, D>;
  onRowClick?: (i: number) => void;
  isLoading?: boolean;
  columns?: number;
  rows?: number;
}

function Table<TField, TData = TField>({
  tableData,
  fields,
  builder,
  onRowClick,
  isLoading = false,
  columns,
  rows,
  noDataMessage = 'No records found to display',
}: TableProps<TField, TData>) {
  const numberOfColumns = columns || fields.length;
  const numberOfRows = tableData.length > 0 ? rows || tableData.length : 0;
  const columnElements: React.ReactNode[] = [];

  for (let i = 0; i < numberOfRows; i += 1) {
    const data = tableData[i];
    const rowElements: React.ReactNode[] = [];

    for (let j = 0; j < numberOfColumns; j += 1) {
      const field = fields[j];
      rowElements.push(
        <td
          key={j}
          className='whitespace-nowrap p-3'
        >
          {builder(field, data, i, j)}
        </td>
      );
    }

    columnElements.push(
      <tr
        key={i}
        className='text-sm leading-[20px] border-b border-gray-500 cursor-pointer hover:bg-b-alpha-1'
        onClick={() => onRowClick?.(i)}
      >
        {rowElements}
      </tr>
    );
  }

  return (
    <div className='border border-gray-500 rounded-[10px] bg-white relative text-dark-500 overflow-x-auto relative min-h-[220px]'>
      <table
        className={cn('w-full', {
          hidden: isLoading || columnElements?.length === 0,
        })}
      >
        <thead className='text-sm leading-[20px] font-medium border-b border-gray-500'>
          <tr className='text-gray-600 text-left'>
            {fields.map((data) => (
              <th
                scope='col'
                className='whitespace-nowrap min-w-[150px] p-3'
                key={Math.random().toString()}
              >
                {data.displayName || (data.name as string)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{columnElements}</tbody>
      </table>

      {/* loading state */}
      {isLoading && (
        <div className='flex h-full items-center justify-center absolute top-0 bottom-0 left-0 right-0'>
          <Loader />
        </div>
      )}

      {/* no data state */}
      <div
        className={cn(
          'h-full flex items-center justify-center absolute top-0 bottom-0 left-0 right-0',
          { hidden: columnElements?.length > 0 }
        )}
      >
        <div className={cn({ hidden: isLoading })}>{noDataMessage}</div>
      </div>
    </div>
  );
}

export default Table;
