import { PAGE_SIZE } from '@/constants';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  pageSize?: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize = PAGE_SIZE,
  totalCount,
  onPageChange
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const startResult = (currentPage - 1) * pageSize + 1;
  const endResult = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between mt-8 text-sm font-bold">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>&larr;</span> Previous
      </button>

      <span className="text-slate-600 font-normal">
        Showing <span className="font-bold text-slate-900">{startResult}</span>{' '}
        to <span className="font-bold text-slate-900">{endResult}</span> of{' '}
        <span className="font-bold text-slate-900">{totalCount}</span> results
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next <span>&rarr;</span>
      </button>
    </div>
  );
};

export default Pagination;
