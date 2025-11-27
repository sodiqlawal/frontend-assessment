import Link from 'next/link';
import { FC } from 'react';
import { Icons } from '../icons';

type Props = { title: string; isDisabled?: boolean; href?: string }[];
const BreadCrumb: FC<{ crumbs: Props }> = ({ crumbs }) => {
  if (!crumbs || crumbs?.length === 0) return null;
  return (
    <div className='flex items-center gap-[11px]'>
      {crumbs.map((crumb, i) => (
        <div
          className='flex items-center gap-[11px] text-sm text-gray-600'
          key={i}
        >
          {crumb.isDisabled ? (
            <span className='text-dark-500'>{crumb.title}</span>
          ) : (
            <Link href={crumb.href || ''}>{crumb.title}</Link>
          )}
          {i < crumbs.length - 1 && (
            <span className='p-[3px]'>
              <Icons.crumbSeperator />
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
