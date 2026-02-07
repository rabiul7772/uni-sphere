import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/shared/Pagination';
import { PAGE_SIZE } from '@/constants';
import SubjectBreadcrumb from '@/features/subjects/Breadcrumb';
import SubjectHeader from '@/features/subjects/Header';
import SubjectTable from '@/features/subjects/Table';
import { useSubjects } from '@/hooks/subjects/useSubjects';
import { ErrorMessage } from '@/components/ui/error-message';

const Subjects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: response,
    isPending,
    error
  } = useSubjects({
    page,
    limit: PAGE_SIZE,
    search: searchTerm
  });

  const subjects = response?.data || [];
  const totalCount = response?.count || 0;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setSearchParams({ page: '1' }); // Reset to page 1 on search
  };

  if (error)
    return (
      <ErrorMessage
        className="mx-8 mt-8"
        title="Failed to load subjects"
        message={error.message}
      />
    );

  return (
    <div className="flex flex-col gap-8">
      <SubjectBreadcrumb />
      <SubjectHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <SubjectTable subjects={subjects} isLoading={isPending} />

        {totalCount > PAGE_SIZE && (
          <Pagination
            currentPage={page}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Subjects;
