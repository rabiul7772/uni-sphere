import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ClassesBreadcrumb } from '@/features/classes/ClassesBreadcrumb';
import { ClassesHeader } from '@/features/classes/ClassesHeader';
import { ClassesTable } from '@/features/classes/ClassesTable';
import { useClasses } from '@/hooks/classes/useClasses';
import Pagination from '@/components/shared/Pagination';
import { PAGE_SIZE } from '@/constants';

const Classes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const page = Number(searchParams.get('page')) || 1;

  const { data: response, isPending } = useClasses({
    page,
    limit: PAGE_SIZE,
    search: searchTerm
  });

  const classes = response?.data || [];
  const totalCount = response?.count || 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <div className="max-w-[1200px] mx-auto pb-10">
      <ClassesBreadcrumb />
      <ClassesHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <ClassesTable classes={classes} isLoading={isPending} />

      {totalCount > PAGE_SIZE && (
        <Pagination
          currentPage={page}
          pageSize={PAGE_SIZE}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Classes;
