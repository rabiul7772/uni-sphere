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
    <div className="flex items-center justify-between mt-4 text-sm">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-foreground hover:text-primary font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <span className="text-lg leading-none">&larr;</span> Previous
      </button>

      <span className="text-foreground font-medium">
        Showing <span className="font-bold text-foreground">{startResult}</span>{' '}
        to <span className="font-bold text-foreground">{endResult}</span> of{' '}
        <span className="font-bold text-foreground">{totalCount}</span> results
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-foreground hover:text-primary font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next <span className="text-lg leading-none">&rarr;</span>
      </button>
    </div>
  );
};

export default Pagination;
