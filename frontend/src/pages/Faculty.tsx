import { useState } from 'react';
import { FacultyBreadcrumb } from '@/features/faculty/FacultyBreadcrumb';
import { FacultyTable } from '@/features/faculty/FacultyTable';
import { useUsers } from '@/hooks/users/useUsers';
import FacultyFilter from '@/features/faculty/FacultyFilter';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/shared/Pagination';
import SearchInput from '@/components/shared/SearchInput';
import { PAGE_SIZE } from '@/constants';

const Faculty = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const { data, isFetching } = useUsers(
    {
      page,
      limit: PAGE_SIZE,
      search: searchTerm,
      role: selectedRole
    },
    { keepPreviousData: true }
  );

  const totalCount = data?.count || 0;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-container">
      <FacultyBreadcrumb />

      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Faculty</h1>
        </div>
        <div className="page-header-actions">
          <SearchInput
            searchTerm={searchTerm}
            onSearchChange={val => {
              setSearchTerm(val);
              setSearchParams({ page: '1' });
            }}
            placeholder="Search by name or email..."
            className="hidden md:block"
          />
          <FacultyFilter
            selectedRole={selectedRole}
            onRoleChange={val => {
              setSelectedRole(val);
              setSearchParams({ page: '1' });
            }}
          />
        </div>
      </div>

      <FacultyTable users={data?.data || []} isLoading={isFetching} />

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

export default Faculty;
