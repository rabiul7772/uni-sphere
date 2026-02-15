import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/shared/Pagination';
import { PAGE_SIZE } from '@/constants';
import DepartmentBreadcrumb from '@/features/departments/Breadcrumb';
import DepartmentHeader from '@/features/departments/Header';
import DepartmentTable from '@/features/departments/Table';
import { useDepartments } from '@/hooks/departments/useDepartments';

import { ErrorMessage } from '@/components/ui/error-message';

const Departments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: response,
    isPending,
    error
  } = useDepartments({
    page,
    limit: PAGE_SIZE,
    search: searchTerm
  });

  const departments = response?.data || [];
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
      <ErrorMessage className="mx-8 mt-8" title="Failed to load departments" />
    );

  return (
    <div className="page-container">
      <DepartmentBreadcrumb />
      <DepartmentHeader
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      <DepartmentTable departments={departments} isLoading={isPending} />

      {totalCount > PAGE_SIZE && (
        <Pagination
          currentPage={page}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Departments;
