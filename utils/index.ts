import { User } from '@/types/user';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getPagination = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const pages: (number | string)[] = [];

  // Small page counts: show everything
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  // Always show first page
  pages.push(1);

  // Decide where the "last three" window starts
  const lastWindowStart = totalPages - 2;

  // CASE 1: we're before the last window
  if (currentPage < lastWindowStart - 1) {
    // show current page window (current ± 1), but not beyond lastWindowStart - 1
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(lastWindowStart - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    // only show ellipsis if there is a gap before last 3 pages
    if (end < lastWindowStart - 1) {
      pages.push('...');
    }

    // always show the last three pages
    for (let i = lastWindowStart; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  // CASE 2: we're inside or after the last window -> just show last 4 + possible ellipsis
  // If there are pages between 1 and lastWindowStart, show ellipsis
  if (lastWindowStart > 2) {
    pages.push('...');
  }

  for (let i = lastWindowStart; i <= totalPages; i++) {
    pages.push(i);
  }

  return pages;
};

export const formatUserAddress = (user: User) => {
  if (!user) return '';
  return `${user.street}, ${user.state}, ${user.city}, ${user.zipcode}`;
};
