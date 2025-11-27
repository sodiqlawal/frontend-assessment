import { Colors } from '@/constants/color';
import { cn, getPagination } from '@/utils';
import { Icons } from '../icons';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const pagination = getPagination(currentPage, totalPages);
  if (!totalPages || totalPages === 0) return null;
  return (
    <div className='flex items-center justify-center sm:justify-end gap-2 sm:gap-6 text-dark-500'>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className='py-[12px] px-1 sm:px-[10px] flex items-center gap-1 text-dark-500 text-sm cursor-pointer disabled:cursor-not-allowed disabled:text-dark-300 text-[11px] sm:text-sm font-medium leading-[1.43]'
      >
        <Icons.chevronLeft
          color={currentPage === 1 ? Colors.dark[300] : Colors.dark[500]}
        />{' '}
        <span>Previous</span>
      </button>
      <div
        className={cn(
          'flex items-center justify-center gap-[2px] overflow-auto whitespace-nowrap no-scrollbar'
        )}
      >
        {pagination.map((page, index) =>
          page === '...' ? (
                <span
                    key={index}
                    className="mb-2 py-[6px] px-2 sm:px-[15.5px] text-[11px] sm:text-sm font-medium cursor-default select-none"
                    aria-label="More pages"
                >
                    ...
                </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(Number(page))}
              className={cn(
                `flex items-center justify-center py-[6px] px-2 sm:px-[15.5px] cursor-pointer text-[11px] sm:text-sm font-medium leading-[1.43]`,
                {
                  'bg-white border border-gray-500 rounded-[6px]':
                    Number(page) === currentPage,
                }
              )}
            >
              <span className='text-center'>{page}</span>
            </button>
          )
        )}
      </div>
      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className='py-[12px] px-1 sm:px-[10px] flex items-center gap-1 text-dark-500 text-[11px] sm:text-sm cursor-pointer disabled:cursor-not-allowed disabled:text-dark-300 text-sm font-medium leading-[1.43]'
      >
        <span>Next</span>
        <Icons.chevronRight
          color={
            currentPage === totalPages ? Colors.dark[300] : Colors.dark[500]
          }
        />
      </button>
    </div>
  );
};
export default Pagination;
