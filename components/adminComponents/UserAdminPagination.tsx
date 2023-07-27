/*

Pagination Component Props
- totalCount, total count of data from soruce
- currentPage, 0 based index
- pageSize, maximum data that's visible in single page
- onPageChange, callback invoked with updated page value
- siblingCount, min number of page buttons to be shown on each
    side of current page button

usePagination hook, takes params totalCount, 
currentPage, pageSize, siblingCount
- return range of numbers to display in our pagination
- re run when any of the input changes
- total number of items returned by hook should remain constant

*/

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useMemo } from 'react';

const DOTS = '...';

const usePagination = ({ totalCount, pageSize, siblingCount, currentPage }) => {
  const paginationRange = useMemo(() => {
    const range = (start, end) => {
      let length = end - start + 1;
      return Array.from({ length }, (_, i) => i + start);
    };

    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = Math.max(8, siblingCount + 4);

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  siblingCount = 1,
  onPageChange,
}) {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage,
  });
  console.log(totalCount, pageSize, siblingCount, currentPage, paginationRange);
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        className="flex flex-col item-center justify-center w-6 h-6 rounded-full border-2 border-complementary/25"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeftIcon className="ml-0.5 w-4 h-4 text-complementary cursor-pointer" />
      </button>

      {paginationRange.map((pageNumber, i) => {
        return (
          <div
            key={i}
            className={`flex items-center justify-center w-6 h-6 rounded-full mx-1 cursor-pointer text-sm
          ${pageNumber === currentPage ? 'bg-primaryDark text-white' : 'text-complementary'}
          `}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}

      <button
        className="flex flex-col item-center justify-center w-6 h-6 rounded-full border-2 border-complementary/25"
        disabled={currentPage >= lastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRightIcon className="ml-0.5 w-4 h-4 text-complementary cursor-pointer" />
      </button>
    </div>
  );
}
